using Hatley.DTO;
using Hatley.Models;
using MailKit.Search;
using Microsoft.EntityFrameworkCore.Update.Internal;

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
				order_Governorate = x.Order_Governorate,
				order_Zone = x.Order_Zone,
				order_time = x.Order_time,
				created = x.Created,
				User_ID = x.User_ID,
				Delivery_ID = x.Delivery_ID
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

				List<Order> orders = context.orders.Where(x => x.Delivery_ID == deliveryrid).ToList();
				if (orders.Count == 0)
				{
					return null;
				}
				List<OrderDTO> ordersdto = orders.Select(x => new OrderDTO()
				{
					Id = x.Order_ID,
					description = x.Description,
					price = x.Price,
					order_Governorate = x.Order_Governorate,
					order_Zone = x.Order_Zone,
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

			int userid = context.users
						.Where(x => x.Email == mail)
						.Select(x => x.User_ID)
						.FirstOrDefault();

			List<Order> ordersuser = context.orders.Where(x => x.User_ID == userid).ToList();
			if (ordersuser.Count == 0)
			{
				return null;
			}
			List<OrderDTO> ordersdtouser = ordersuser.Select(x => new OrderDTO()
			{
				Id = x.Order_ID,
				description = x.Description,
				order_Governorate = x.Order_Governorate,
				order_Zone = x.Order_Zone,
				north = x.North,
				east = x.East,
				created = x.Created,
				status = x.Status,
				User_ID = x.User_ID,
				Delivery_ID = x.Delivery_ID
			}).ToList();
			return ordersdtouser;

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
				order_Governorate = order.Order_Governorate,
				order_Zone = order.Order_Zone,
				order_time = order.Order_time,
				created = order.Created,
				User_ID = order.User_ID,
				Delivery_ID=order.Delivery_ID

			};
			return orderdto;
		}

		public int Create(OrderDTO orderdto)
		{
			if (orderdto.User_ID == null)
			{
				return -1;
			}

			var checkuserid=context.users.FirstOrDefault(x=>x.User_ID==orderdto.User_ID);
			if (checkuserid == null)
			{
				return -2;
			}

			order.Description = orderdto.description;
			order.Price = orderdto.price;
			order.North = orderdto.north;
			order.East = orderdto.east;
			order.Order_Governorate = orderdto.order_Governorate;
			order.Order_Zone = orderdto.order_Zone;
			order.Order_time = orderdto.order_time;
			order.Created = DateTime.Now;
			order.User_ID = orderdto.User_ID;
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
			oldorder.Order_Governorate = orderdto.order_Governorate;
			oldorder.Order_Zone = orderdto.order_Zone;
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
