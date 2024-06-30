using Hatley.DTO;
using Hatley.Hubs;
using Hatley.Models;
using MailKit.Search;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Update.Internal;
using System.Diagnostics.CodeAnalysis;

namespace Hatley.Services
{
	public class OrderDTORepo : IOrderDTORepo
	{
		private readonly IHubContext<NotifyNewOrderForDeliveryHup> OrderHub;
		private readonly Order order;
		private readonly appDB context;

		public OrderDTORepo(Order _order, appDB _context
			, IHubContext<NotifyNewOrderForDeliveryHup> _OrderHub)
		{
			order = _order;
			context = _context;
			OrderHub = _OrderHub;
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
				order_id = x.Order_ID,
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


		public List<RelatedOrdersForDeliveryDTO>? DisplayUnRelatedOrdersForDelivery(string email)
		{
			var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
			List<Order> orders = context.orders.Where(x => x.Delivery_ID == null).ToList();
			if (orders == null || delivery == null)
			{
				return null;
			}

			List<int?> userIds = orders.Select(x => x.User_ID).ToList();
			List<User> users = context.users.Where(x => userIds.Contains(x.User_ID)).ToList();

			// Calculate order counts for each user
			var userOrderCounts = context.orders
				.Where(o => userIds.Contains(o.User_ID))
				.GroupBy(o => o.User_ID)
				.Select(g => new { UserId = g.Key, OrderCount = g.Count() })
				.ToList();

			var governorate = context.governorates.FirstOrDefault(x => x.Governorate_ID == delivery.Governorate_ID);
			var zone = context.zones.FirstOrDefault(x => x.Zone_ID == delivery.Zone_ID);

			List<RelatedOrdersForDeliveryDTO> ordersdto = orders
				.Join(users,
					o => o.User_ID,
					u => u.User_ID,
					(o, u) => new { Order = o, User = u })
				.Join(userOrderCounts,
					ou => ou.User.User_ID,
					uoc => uoc.UserId,
					(ou, uoc) => new { OrderUser = ou, OrderCount = uoc.OrderCount })
				.Where(our => our.OrderUser.Order.Order_governorate_to == governorate?.Name
				&& (our.OrderUser.Order.Order_zone_to != zone?.Name
				&& our.OrderUser.Order.Order_zone_from != zone?.Name))
				.Select(our => new RelatedOrdersForDeliveryDTO()
				{
					order_id = our.OrderUser.Order.Order_ID,
					description = our.OrderUser.Order.Description,
					price = our.OrderUser.Order.Price,
					status = our.OrderUser.Order.Status,
					order_governorate_from = our.OrderUser.Order.Order_governorate_from,
					order_zone_from = our.OrderUser.Order.Order_zone_from,
					order_city_from = our.OrderUser.Order.Order_city_from,
					detailes_address_from = our.OrderUser.Order.Detailes_address_from,
					order_governorate_to = our.OrderUser.Order.Order_governorate_to,
					order_zone_to = our.OrderUser.Order.Order_zone_to,
					order_city_to = our.OrderUser.Order.Order_city_to,
					detailes_address_to = our.OrderUser.Order.Detailes_address_to,
					order_time = our.OrderUser.Order.Order_time,
					created = our.OrderUser.Order.Created,
					User_ID = our.OrderUser.Order.User_ID,
					Delivery_ID = our.OrderUser.Order.Delivery_ID,
					name = our.OrderUser.User.Name,
					photo = our.OrderUser.User.Photo,
					orders_count = our.OrderCount,
					//user_orders_avg = our.OrderCount
					
				}).ToList();

			return ordersdto;
		}



		public List<RelatedOrdersForDeliveryDTO>? DisplayRelatedOrdersForDelivery(string email)
		{
			var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
			List<Order> orders = context.orders.Where(x => x.Delivery_ID == null).ToList();
			if (orders == null || delivery == null)
			{
				return null;
			}

			List<int?> userIds = orders.Select(x => x.User_ID).ToList();
			List<User> users = context.users.Where(x => userIds.Contains(x.User_ID)).ToList();

			// Calculate order counts for each user
			var userOrderCounts = context.orders
				.Where(o => userIds.Contains(o.User_ID))
				.GroupBy(o => o.User_ID)
				.Select(g => new { UserId = g.Key, OrderCount = g.Count() })
				.ToList();

			var governorate = context.governorates.FirstOrDefault(x => x.Governorate_ID == delivery.Governorate_ID);
			var zone = context.zones.FirstOrDefault(x => x.Zone_ID == delivery.Zone_ID);

			List<RelatedOrdersForDeliveryDTO> ordersdto = orders
				.Join(users,
					o => o.User_ID,
					u => u.User_ID,
					(o, u) => new { Order = o, User = u })
				.Join(userOrderCounts,
					ou => ou.User.User_ID,
					uoc => uoc.UserId,
					(ou, uoc) => new { OrderUser = ou, OrderCount = uoc.OrderCount })
				.Where(our => our.OrderUser.Order.Order_governorate_to == governorate?.Name
				&& (our.OrderUser.Order.Order_zone_to == zone?.Name
				|| our.OrderUser.Order.Order_zone_from == zone?.Name))
				.Select(our => new RelatedOrdersForDeliveryDTO()
				{
					order_id = our.OrderUser.Order.Order_ID,
					description = our.OrderUser.Order.Description,
					price = our.OrderUser.Order.Price,
					status = our.OrderUser.Order.Status,
					order_governorate_from = our.OrderUser.Order.Order_governorate_from,
					order_zone_from = our.OrderUser.Order.Order_zone_from,
					order_city_from = our.OrderUser.Order.Order_city_from,
					detailes_address_from = our.OrderUser.Order.Detailes_address_from,
					order_governorate_to = our.OrderUser.Order.Order_governorate_to,
					order_zone_to = our.OrderUser.Order.Order_zone_to,
					order_city_to = our.OrderUser.Order.Order_city_to,
					detailes_address_to = our.OrderUser.Order.Detailes_address_to,
					order_time = our.OrderUser.Order.Order_time,
					created = our.OrderUser.Order.Created,
					User_ID = our.OrderUser.Order.User_ID,
					Delivery_ID = our.OrderUser.Order.Delivery_ID,
					name = our.OrderUser.User.Name,
					photo = our.OrderUser.User.Photo,
					orders_count = our.OrderCount
				}).ToList();

			return ordersdto;
		}


		/*public List<RelatedOrdersForDeliveryDTO>? DisplayUnRelatedOrdersForDelivery(string email)
		{
			var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
			List<Order> orders = context.orders.Where(x => x.Delivery_ID == null).ToList();
			if (orders == null || delivery == null)
			{
				return null;
			}


			List<int?> userIds = orders
				.Select(x => x.User_ID)
				.ToList();
			List<User> users = context.users
				.Where(x => userIds.Contains(x.User_ID))
				.ToList();
			*//*List<int> ratings = context.ratings
				.Where(x => userIds.Contains(x.User_ID))
				.Select(x => x.Value)
				.ToList();*//*


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
				&& (our.Order.Order_zone_to != zone?.Name
				|| our.Order.Order_zone_from != zone?.Name))
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

		}*/


		/*public List<RelatedOrdersForDeliveryDTO>? DisplayRelatedOrdersForDelivery(string email)
		{
			var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
			List<Order> orders = context.orders.Where(x=>x.Delivery_ID == null).ToList();
			if(orders == null || delivery == null)
			{
				return null;
			}


			List<int?> userIds = orders
				.Select(x => x.User_ID)
				.ToList();
			List<User> users = context.users
				.Where(x => userIds.Contains(x.User_ID))
				.ToList();
			*//*List<int> ratings = context.ratings
				.Where(x => userIds.Contains(x.User_ID))
				.Select(x => x.Value)
				.ToList();*//*
			

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
				&& (our.Order.Order_zone_to == zone?.Name
				|| our.Order.Order_zone_from == zone?.Name))
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

		}*/

		public List<RelatedOrdersForDeliveryDTO>? GetOrdersForUserOrDelivery(string mail, string type)
		{
			if (type == "Delivery")
			{
				var delivery = context.delivers.FirstOrDefault(x => x.Email == mail);

				List<Order> orders = context.orders
					.Where(x => x.Delivery_ID == delivery.Delivery_ID)
					.OrderBy(x => x.Status).ToList();

				if (orders == null || delivery == null)
				{
					return null;
				}

				List<int?> userIds = orders.Select(x => x.User_ID).ToList();
				List<User> users = context.users.Where(x => userIds.Contains(x.User_ID)).ToList();

				// Calculate order counts for each user
				var userOrderCounts = context.orders
					.Where(o => userIds.Contains(o.User_ID))
					.GroupBy(o => o.User_ID)
					.Select(g => new { UserId = g.Key, OrderCount = g.Count() })
					.ToList();

				// Get order ratings
				var orderRatings = context.ratings
					.Where(r => orders.Select(o => o.Order_ID).Contains(r.Order_ID))
					.Select(r => new { r.Order_ID, r.Value })
					.ToList();

				List<RelatedOrdersForDeliveryDTO> ordersdto = orders
					.Join(users,
						o => o.User_ID,
						u => u.User_ID,
						(o, u) => new { Order = o, User = u })
					.Join(userOrderCounts,
						ou => ou.User.User_ID,
						uoc => uoc.UserId,
						(ou, uoc) => new { OrderUser = ou, OrderCount = uoc.OrderCount })
					.GroupJoin(orderRatings,
						ou => ou.OrderUser.Order.Order_ID,
						r => r.Order_ID,
						(ou, ratings) => new { ou.OrderUser, ou.OrderCount, Ratings = ratings })
					.SelectMany(our => our.Ratings.DefaultIfEmpty(), (our, rating) => new { our.OrderUser, our.OrderCount, Rating = rating })
					.Select(our => new RelatedOrdersForDeliveryDTO()
					{
						order_id = our.OrderUser.Order.Order_ID,
						description = our.OrderUser.Order.Description,
						price = our.OrderUser.Order.Price,
						status = our.OrderUser.Order.Status,
						order_governorate_from = our.OrderUser.Order.Order_governorate_from,
						order_zone_from = our.OrderUser.Order.Order_zone_from,
						order_city_from = our.OrderUser.Order.Order_city_from,
						detailes_address_from = our.OrderUser.Order.Detailes_address_from,
						order_governorate_to = our.OrderUser.Order.Order_governorate_to,
						order_zone_to = our.OrderUser.Order.Order_zone_to,
						order_city_to = our.OrderUser.Order.Order_city_to,
						detailes_address_to = our.OrderUser.Order.Detailes_address_to,
						order_time = our.OrderUser.Order.Order_time,
						created = our.OrderUser.Order.Created,
						User_ID = our.OrderUser.Order.User_ID,
						Delivery_ID = our.OrderUser.Order.Delivery_ID,
						name = our.OrderUser.User.Name,
						photo = our.OrderUser.User.Photo,
						orders_count = our.OrderCount,
						order_rate = our.Rating?.Value ?? 0 // Default value if rating is null
					}).ToList();

				return ordersdto;

				/*int deliveryrid = context.delivers
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
					order_id = x.Order_ID,
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
				return ordersdto;*/
			}

			//******************** User ******************************
			int userId = context.users
				.Where(x => x.Email == mail)
				.Select(x => x.User_ID)
				.FirstOrDefault();

			List<Order> ordersuser = context.orders
				.Where(x => x.User_ID == userId && x.Status == -1 && x.Delivery_ID == null)
				.ToList();

			if (ordersuser.Count == 0)
			{
				return null;
			}

			/*List<int?> deliveryIds = ordersuser.Select(x => x.Delivery_ID).ToList();

			List<Delivery> deliveries = context.delivers
				.Where(x => deliveryIds.Contains(x.Delivery_ID))
				.ToList();

			var deliveryRatings = context.ratings
				.Where(o => deliveryIds.Contains(o.Id_for_delivery))
				.GroupBy(o => o.Id_for_delivery)
				.Select(g => new
				{
					DeliveryId = g.Key,
					Count = g.Count(),
					Avg = g.Average(r => r.Value)
				})
				.ToList();*/

			// Create the DTOs
			List<RelatedOrdersForDeliveryDTO> ordersdtouser = ordersuser
				.Select(order =>
				{
					//var delivery = deliveries.FirstOrDefault(d => d.Delivery_ID == order.Delivery_ID);
					//var rating = deliveryRatings.FirstOrDefault(r => r.DeliveryId == order.Delivery_ID);

					return new RelatedOrdersForDeliveryDTO()
					{
						order_id = order.Order_ID,
						description = order.Description,
						price = order.Price,
						order_governorate_from = order.Order_governorate_from,
						order_zone_from = order.Order_zone_from,
						order_city_from = order.Order_city_from,
						detailes_address_from = order.Detailes_address_from,
						order_governorate_to = order.Order_governorate_to,
						order_zone_to = order.Order_zone_to,
						order_city_to = order.Order_city_to,
						detailes_address_to = order.Detailes_address_to,
						created = order.Created,
						order_time = order.Order_time,
						status = order.Status,
						User_ID = order.User_ID,
						Delivery_ID = order.Delivery_ID,
						/*name = delivery.Name,
						photo = delivery?.Photo,*/
						count_rate = 0, //rating?.Count ?? 0,
						avg_rate = 0, //Math.Round(rating?.Avg ?? 0, 1)
					};
				})
				.ToList();

			return ordersdtouser;


			/*int userid = context.users
						.Where(x => x.Email == mail)
						.Select(x => x.User_ID)
						.FirstOrDefault();

			List<Order> ordersuser = context.orders.
				Where(x => x.User_ID == userid && x.Status == -1 )
				.OrderBy(x=>x.Status).ToList();
			
			if (ordersuser.Count == 0)
			{
				return null;
			}


			List<int?> deliveryIds = ordersuser.Select(x => x.Delivery_ID).ToList();
			List<Delivery> delivers = context.delivers.Where(x => deliveryIds.Contains(x.Delivery_ID)).ToList();


			var deliveryratingCounts = context.ratings
					.Where(o => deliveryIds.Contains(o.Id_for_delivery))
					.GroupBy(o => o.Id_for_delivery)
					.Select(g => new { UserId = g.Key, OrderCount = g.Count() })
					.ToList();

			List<RelatedOrdersForDeliveryDTO> ordersdtouser = ordersuser
				.Select(x => new RelatedOrdersForDeliveryDTO()
			{
				order_id = x.Order_ID,
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
				created = x.Created,
				order_time = x.Order_time,
				status = x.Status,
				User_ID = x.User_ID,
				Delivery_ID = x.Delivery_ID,
				name = delivers.Name,
				photo = delivers.Photo,
				count_rate = ,
				avg_rate = 

			}).ToList();
			return ordersdtouser;*/

		}



		public List<DeliveriesUserDTO>? Deliveries(string email)
		{
			var user = context.users.FirstOrDefault(x => x.Email == email);
			if (user == null)
			{
				return null;
			}

			List<Order> orders = context.orders
				.Where(x => x.User_ID == user.User_ID && x.Status == 3)
				.ToList();

			if (orders.Count == 0)
			{
				return null;
			}

			List<int?> deliveryIds = orders.Select(o => o.Delivery_ID).ToList();
			List<Delivery> deliveries = context.delivers
				.Where(x => deliveryIds.Contains(x.Delivery_ID))
				.ToList();

			var deliveryRatings = context.ratings
				.Where(x => deliveryIds.Contains(x.Id_for_delivery))
				.GroupBy(x => x.Id_for_delivery)
				.Select(g => new
				{
					Delivery_ID = g.Key,
					AvgRating = g.Average(x => x.Value)
				}).ToList();

			var orderRatings = context.ratings
				.Where(x => orders.Select(o => o.Order_ID).Contains(x.Order_ID))
				.GroupBy(x => x.Order_ID)
				.Select(g => new
				{
					Order_ID = g.Key,
					OrderRating = g.Average(x => x.Value)
				}).ToList();

			var result = from o in orders
						 join d in deliveries on o.Delivery_ID equals d.Delivery_ID into od
						 from d in od.DefaultIfEmpty()
						 join r in deliveryRatings on d.Delivery_ID equals r.Delivery_ID into dr
						 from r in dr.DefaultIfEmpty()
						 join or in orderRatings on o.Order_ID equals or.Order_ID into orj
						 from or in orj.DefaultIfEmpty()
						 select new DeliveriesUserDTO
						 {
							 order_id = o.Order_ID,
							 description = o.Description,
							 price = o.Price,
							 status = o.Status,
							 order_governorate_from = o.Order_governorate_from,
							 order_zone_from = o.Order_zone_from,
							 order_city_from = o.Order_city_from,
							 order_governorate_to = o.Order_governorate_to,
							 order_zone_to = o.Order_zone_to,
							 order_city_to = o.Order_city_to,
							 order_time = o.Order_time,
							 detailes_address_from = o.Detailes_address_from,
							 detailes_address_to = o.Detailes_address_to,
							 created = o.Created,
							 delivery_name = d?.Name,
							 delivery_photo = d?.Photo,
							 delivery_avg_rate = Math.Round(r?.AvgRating ?? 0, 1),
							 order_rate = (int?)or?.OrderRating
						 };

			return result.ToList();
			/*var user = context.users.FirstOrDefault(x=>x.Email == email);

			List<Order> orders = context.orders.
				Where(x=>x.User_ID==user.User_ID && x.Status==3).ToList();

			List<int?> deliveryIds = orders.Select(o => o.Delivery_ID).ToList();

			List<Delivery> delivers = context.delivers.Where(x => x.Delivery_ID == deliveryIds)
				.Select(x => x.Value).ToList();

			List<int> rate = context.ratings.Where(x => x.Id_for_delivery == deliveryIds)
				.Select(x => x.Value).ToList();
			if (orders.Count == 0)
			{
				return null;
			}


			if (rate.Count == 0)
			{
				List<DeliveriesUserDTO> orderdto = orders.Select(x => new DeliveriesUserDTO()
				{
					Order_id = x.Order_ID,
					description = x.Description,
					price = x.Price,
					status = x.Status,
					order_city_from = x.Order_city_from,
					order_city_to = x.Order_city_to,
					order_time = x.Order_time,
					detailes_address_from = x.Detailes_address_from,
					detailes_address_to = x.Detailes_address_to,
					created = x.Created,
					delivery_name = delivers.Delivery_name,
					delivery_photo = delivers.Delivery_photo,
					delivery_avg_rate = Math.Round(rate.Average(), 1)
				}).ToList();

				return orderdto;
			}


			List<DeliveriesUserDTO> ordersdto = orders.Select(x => new DeliveriesUserDTO()
			{
				Order_id = x.Order_ID,
				description = x.Description,
				price = x.Price,
				status = x.Status,
				order_zone_from = x.Order_zone_from,
				order_city_from = x.Order_city_from,
				order_zone_to = x.Order_zone_to,
				order_city_to = x.Order_city_to,
				order_time = x.Order_time,
				detailes_address_from = x.Detailes_address_from,
				detailes_address_to = x.Detailes_address_to,
				created = x.Created,
				delivery_name = delivers.Delivery_name,
				delivery_photo = delivers.Delivery_photo,
				delivery_avg_rate = Math.Round(rate.Average(), 1)
			}).ToList();

			return ordersdto;*/
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
				order_id = order.Order_ID,
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


		public StatisticsDTO? Statistics(string email , string type)
		{
			if(type == "Delivery")
			{
				var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
				if (delivery == null)
				{
					return null;
				}
				List<Order> orders = context.orders
					.Where(x => x.Delivery_ID == delivery.Delivery_ID).ToList();
				
				if (orders.Count == 0)
				{
					return null;
				}

				var com = orders.Where(x => x.Status == 3);
				var incom = orders.Where(x => x.Status == -1);
				var pen = orders.Count - (com.Count() + incom.Count());

				DateTime thirtyDaysAgo = DateTime.Now.AddDays(-30);
				var ordersLast30Days = orders.Where(x => x.Created >= thirtyDaysAgo).ToList();

				List<Rating> ratings = context.ratings
					.Where(x => x.Id_for_delivery == delivery.Delivery_ID).ToList();
				double averageRating = ratings.Count > 0 ? ratings.Average(x => x.Value) : 0;

				var statistics = new StatisticsDTO
				{
					total_orders = orders.Count,
					complete_orders = com.Count(),
					incomplete_orders = incom.Count(),
					pending = pen,
					orders_last_30_days = ordersLast30Days.Count,
					rate = averageRating
				};

				return statistics;

			}

			//###########User########################

			var user = context.users.FirstOrDefault(x => x.Email == email);

			if (user == null)
			{
				return null;
			}

			List<Order> U_orders = context.orders
				.Where(x => x.User_ID == user.User_ID).ToList();

			if (U_orders.Count == 0)
			{
				return null;
			}

			var U_com = U_orders.Where(x => x.Status == 3);
			var U_incom = U_orders.Where(x => x.Status == -1);

			var U_pen = U_orders.Count - (U_com.Count() + U_incom.Count());

			DateTime U_thirtyDaysAgo = DateTime.Now.AddDays(-30);
			var U_ordersLast30Days = U_orders.Where(x => x.Created >= U_thirtyDaysAgo).ToList();

			/*List<Rating> U_ratings = context.ratings
				.Where(x => x.Id_for_user == user.User_ID).ToList();
			double U_averageRating = U_ratings.Count > 0 ? U_ratings.Average(x => x.Value) : 0;
*/
			var avg = ((double)U_com.Count() / U_orders.Count()) * 5;

			var U_statistics = new StatisticsDTO
			{
				total_orders = U_orders.Count,
				complete_orders = U_com.Count(),
				incomplete_orders = U_incom.Count(),
				pending = U_pen,
				orders_last_30_days = U_ordersLast30Days.Count,
				rate = avg
			};

			return U_statistics;
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
			//int raw = context.SaveChanges();

			int raw = 0;
			try
			{
				raw = context.SaveChanges();
			}
			catch (Exception ex)
			{
				return raw;
				// Handle exceptions appropriately
				// You can log the exception, rethrow it, or return an error code
				//throw new InvalidOperationException("Could not save order to the database.", ex);
			}

			if (raw == 1)
			{
				OrderDTO orderdtoHub = new OrderDTO()
				{
					order_id = order.Order_ID,
					description = order.Description,
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
				};

				var gonernorate_name = context.governorates
					.FirstOrDefault(x => x.Name == order.Order_governorate_to);
				var zone_name = context.zones
					.FirstOrDefault(x => x.Name == order.Order_zone_to);

				List<string> delivers_emails = context.delivers
					.Where(x => x.Governorate_ID == gonernorate_name.Governorate_ID && x.Zone_ID == zone_name.Zone_ID)
					.Select(x=>x.Email).ToList();

				OrderHub.Clients.All.SendAsync
					("NotifyOrderForDeliveryHup", orderdtoHub
					, user.Name, user.Orders.Count, delivers_emails, "Delivery");

			}
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
