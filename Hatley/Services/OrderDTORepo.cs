using Hatley.DTO;
using Hatley.Models;
using MailKit.Search;
using Microsoft.EntityFrameworkCore.Update.Internal;
using System.Diagnostics.CodeAnalysis;

namespace Hatley.Services
{
	public class OrderDTORepo : IOrderDTORepo
	{
		private readonly Order order;
		private readonly appDB context;

		public OrderDTORepo(Order _order, appDB _context)
		{
			order = _order;
			context = _context;
		}

		public List<OrderDTO>? GetOrders()
		{
			List<Order> orders = context.orders.ToList();
			if (orders.Count == 0)
			{
				return null;
			}
			List<OrderDTO> ordersdto = orders.Select(x => new OrderDTO()
			{
				Id = x.Order_ID,
				description = x.Description,
				//location = x.Location,
				price = x.Price,
				status = x.Status,
				north = x.North,
				east = x.East,
				order_governorate_from = x.Order_governorate_from,
				order_zone_from = x.Order_zone_from,
				order_city_from = x.Order_city_from,
				detailes_address_from = x.Detailes_address_from,
				order_governorate_to = x.Order_governorate_to,
				order_zone_to = x.Order_zone_to,
				order_city_to = x.Order_city_to,
				detailes_address_to = x.Detailes_address_to,
				order_time = x.Order_time,
				created = x.Created,
				User_ID = x.User_ID,
				Delivery_ID = x.Delivery_ID
			}).ToList();
			return ordersdto;
		}


		public List<RelatedOrdersForDeliveryDTO>? DisplayRelatedOrdersForDelivery(string email)
		{
			var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
			List<Order> orders = context.orders.Where(x=>x.Delivery_ID == null).ToList();
			if(orders == null)
			{
				return null;
			}


			List<int?> userIds = orders
				.Select(x => x.User_ID)
				.ToList();
			List<User> users = context.users
				.Where(x => userIds.Contains(x.User_ID))
				.ToList();
			/*List<int> ratings = context.ratings
				.Where(x => userIds.Contains(x.User_ID))
				.Select(x => x.Value)
				.ToList();*/


			var governorate = context.governorates
				.FirstOrDefault(x => x.Governorate_ID == delivery.Governorate_ID);
			var zone = context.zones
				.FirstOrDefault(x => x.Zone_ID == delivery.Zone_ID);

			List<RelatedOrdersForDeliveryDTO> ordersdto = orders
				.Join(users,
					o => o.User_ID,
					u => u.User_ID,
					(o, u) => new { Order = o, User = u })
				.Where(our => our.Order.Order_governorate_to == governorate?.Name
				&& our.Order.Order_zone_to == zone?.Name)
				.Select(our => new RelatedOrdersForDeliveryDTO()
				{
					Id = our.Order.Order_ID,
					description = our.Order.Description,
					price = our.Order.Price,
					status = our.Order.Status,
					order_governorate_from = our.Order.Order_governorate_from,
					order_zone_from = our.Order.Order_zone_from,
					order_city_from = our.Order.Order_city_from,
					detailes_address_from = our.Order.Detailes_address_from,
					order_governorate_to = our.Order.Order_governorate_to,
					order_zone_to = our.Order.Order_zone_to,
					order_city_to = our.Order.Order_city_to,
					detailes_address_to = our.Order.Detailes_address_to,
					order_time = our.Order.Order_time,
					created = our.Order.Created,
					User_ID = our.Order.User_ID,
					Delivery_ID = our.Order.Delivery_ID,

					user_name = our.User.Name, 
					user_photo = our.User.Photo,
					//user_avg_rate = ratings.Average(),
					//user_count_rate = ratings.Count()

				}).ToList();


			return ordersdto;

		}

		public List<OrderDTO>? GetOrdersForUserOrDelivery(string mail, string type)
		{
			if (type == "Delivery")
			{
				int deliveryrid = context.delivers
								.Where(x => x.Email == mail)
								.Select(x => x.Delivery_ID)
								.FirstOrDefault();

				List<Order> orders = context.orders.
					Where(x => x.Delivery_ID == deliveryrid)
					.OrderBy(x=>x.Status).ToList();

				if (orders.Count == 0)
				{
					return null;
				}

				List<OrderDTO> ordersdto = orders.Select(x => new OrderDTO()
				{
					Id = x.Order_ID,
					description = x.Description,
					price = x.Price,
					order_governorate_from = x.Order_governorate_from,
					order_zone_from = x.Order_zone_from,
					order_city_from = x.Order_city_from,
					detailes_address_from = x.Detailes_address_from,
					order_governorate_to = x.Order_governorate_to,
					order_zone_to = x.Order_zone_to,
					order_city_to = x.Order_city_to,
					detailes_address_to = x.Detailes_address_to,
					north = x.North,
					east = x.East,
					created = x.Created,
					order_time=x.Order_time,
					status = x.Status,
					User_ID = x.User_ID,
					Delivery_ID = x.Delivery_ID

				}).ToList();
				return ordersdto;
			}

			//******************** User ******************************
			int userid = context.users
						.Where(x => x.Email == mail)
						.Select(x => x.User_ID)
						.FirstOrDefault();

			List<Order> ordersuser = context.orders.
				Where(x => x.User_ID == userid && x.Status<3 )
				.OrderBy(x=>x.Status).ToList();

			if (ordersuser.Count == 0)
			{
				return null;
			}
			List<OrderDTO> ordersdtouser = ordersuser.Select(x => new OrderDTO()
			{
				Id = x.Order_ID,
				description = x.Description,
				price = x.Price,
				order_governorate_from = x.Order_governorate_from,
				order_zone_from = x.Order_zone_from,
				order_city_from = x.Order_city_from,
				detailes_address_from = x.Detailes_address_from,
				order_governorate_to = x.Order_governorate_to,
				order_zone_to = x.Order_zone_to,
				order_city_to = x.Order_city_to,
				detailes_address_to = x.Detailes_address_to,
				north = x.North,
				east = x.East,
				created = x.Created,
				order_time = x.Order_time,
				status = x.Status,
				User_ID = x.User_ID,
				Delivery_ID = x.Delivery_ID

			}).ToList();
			return ordersdtouser;

		}

		public List<DeliveriesUserDTO>? Deliveries(string email)
		{
			var user = context.users.FirstOrDefault(x=>x.Email == email);

			List<Order> orders = context.orders.
				Where(x=>x.User_ID==user.User_ID && x.Status==3).ToList();
			/*List<int> rate = context.ratings.Where(x=>x.User_ID == user.User_ID)
				.Select(x=>x.Value).ToList();*/
			if (orders.Count == 0)
			{
				return null;
			}


			/*if(rate.Count == 0)
			{
				List<DeliveriesUserDTO> orderdto = orders.Select(x => new DeliveriesUserDTO()
				{
					Id = x.Order_ID,
					description = x.Description,
					price = x.Price,
					status = x.Status,
					order_city_from = x.Order_city_from,
					order_city_to = x.Order_city_to,
					order_time = x.Order_time,
					detailes_address = x.Detailes_address,
					created = x.Created,
					user_name = user.Name,// may be zero here
				}).ToList();

				return orderdto;
			}
*/

			List<DeliveriesUserDTO> ordersdto = orders.Select(x => new DeliveriesUserDTO()
			{
				Id = x.Order_ID,
				description = x.Description,
				price = x.Price,
				status = x.Status,
				order_city_from = x.Order_city_from,
				order_city_to = x.Order_city_to,
				order_time = x.Order_time,
				detailes_address_from = x.Detailes_address_from,
				detailes_address_to = x.Detailes_address_to,
				created = x.Created,
				user_name = user.Name,// may be zero here
				//user_avg_rate = Math.Round(rate.Average(), 1)
			}).ToList();

			return ordersdto;
		}

		public OrderDTO? GetOrder(int id)
		{
			var order = context.orders.FirstOrDefault(x => x.Order_ID == id);
			if (order == null)
			{
				return null;
			}
			OrderDTO orderdto = new OrderDTO()
			{
				Id = order.Order_ID,
				description = order.Description,
				//location = order.Location,
				price = order.Price,
				status = order.Status,
				north = order.North,
				east = order.East,
				order_governorate_from = order.Order_governorate_from,
				order_zone_from = order.Order_zone_from,
				order_city_from = order.Order_city_from,
				detailes_address_from = order.Detailes_address_from,
				order_governorate_to = order.Order_governorate_to,
				order_zone_to = order.Order_zone_to,
				order_city_to = order.Order_city_to,
				detailes_address_to = order.Detailes_address_to,
				order_time = order.Order_time,
				created = order.Created,
				User_ID = order.User_ID,
				Delivery_ID=order.Delivery_ID

			};
			return orderdto;
		}


		public int Create(OrderDTO orderdto,string email)
		{
			var user = context.users.FirstOrDefault(x=> x.Email == email);

			//#### Hub ####
			order.Description = orderdto.description;
			order.Price = orderdto.price;
			order.North = orderdto.north;
			order.East = orderdto.east;
			order.Order_governorate_from = orderdto.order_governorate_from;
			order.Order_zone_from = orderdto.order_zone_from;
			order.Order_city_from = orderdto.order_city_from;
			order.Detailes_address_from = orderdto.detailes_address_from;
			order.Order_governorate_to = orderdto.order_governorate_to;
			order.Order_zone_to = orderdto.order_zone_to;
			order.Order_city_to = orderdto.order_city_to;
			order.Detailes_address_to = orderdto.detailes_address_to;
			order.Order_time = orderdto.order_time;
			order.Created = DateTime.Now;
			order.User_ID = user.User_ID;
			//order.Location = orderdto.location;
			//order.Status = orderdto.Status;
			context.orders.Add(order);
			int raw = context.SaveChanges();
			return raw;
		}

		public int Update(int id, OrderDTO orderdto)
		{
			var oldorder = context.orders.FirstOrDefault(x => x.Order_ID == id);
			if (oldorder == null)
			{
				return -1;
			}
			oldorder.Description = orderdto.description;
			oldorder.Price = orderdto.price;
			oldorder.North = orderdto.north;
			oldorder.East = orderdto.east;
			oldorder.Order_governorate_from=orderdto.order_governorate_from;
			oldorder.Order_zone_from=orderdto.order_zone_from;
			oldorder.Order_city_from=orderdto.order_city_from;
			oldorder.Detailes_address_from = orderdto.detailes_address_from;
			oldorder.Order_governorate_to = orderdto.order_governorate_to;
			oldorder.Order_zone_to = orderdto.order_zone_to;
			oldorder.Order_city_to = orderdto.order_city_to;
			oldorder.Detailes_address_to = orderdto.detailes_address_to;
			oldorder.Order_time = orderdto.order_time;
			//oldorder.Location = orderdto.location;
			//oldorder.Status = orderdto.Status;
			//oldorder.User_ID = orderdto.User_ID;
			int raw = context.SaveChanges();
			return raw;
		}

		public int Delete(int id)
		{
			var order = context.orders.FirstOrDefault(x => x.Order_ID == id);
			if (order != null)
			{
				context.orders.Remove(order);
				int raw = context.SaveChanges();
				return raw;
			}
			return -1;
		}
	}
}
