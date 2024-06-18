using Hatley.DTO;
using Hatley.Hubs;
using Hatley.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Linq;

namespace Hatley.Services
{
	public class OfferDTORepo : IOfferDTORepo
	{
		private readonly appDB context;
		private readonly IHubContext<NotifyOfAcceptionForDeliveryHub> acceptionHub;
		private readonly IHubContext<NotifyNewOfferForUserHub> NewOfferForUser;

		public OfferDTORepo(appDB _context
			, IHubContext<NotifyOfAcceptionForDeliveryHub> acceptionHub
			, IHubContext<NotifyNewOfferForUserHub> NewOfferForUser)
		{
			context = _context;
			this.acceptionHub = acceptionHub;
			this.NewOfferForUser = NewOfferForUser;
		}

		public OfferDTO? Display_Offer_Of_Order(int orderId, string email)//for delivery
		{
			var order = context.orders.FirstOrDefault(x => x.Order_ID == orderId);

			var user = context.users.FirstOrDefault(x => x.User_ID == order.User_ID);
			
			if (order == null || user == null)
			{
				return null;
			}

			/*List<int> rate = context.ratings.Where(x => x.User_ID == order.User_ID)
				.Select(x => x.Value).ToList();
			if (rate.Count == 0)
			{
				OfferDTO offerdt = new OfferDTO()
				{
					order_id = order.Order_ID,
					user_name = user.Name,
					user_photo = user.Photo,
					description = order.Description,
					from = order.Order_zone_from,
					to = order.Order_zone_to,
					price = order.Price,
					delivery_email = email,
					
				};
				return offerdt;
			}*/

			OfferDTO offerdto = new OfferDTO()
			{
				order_id = order.Order_ID,
				user_name = user.Name,
				user_photo = user.Photo,
				description = order.Description,
				from = order.Order_zone_from,
				to = order.Order_zone_to,
				price = order.Price,
				delivery_email = email,
				//user_avg_rate = Math.Round(rate.Average(), 1),
				//user_count_rate = rate.Count()
			};
			return offerdto;

		}

		public ViewOfferForUserDTO? ViewOffer(int orderid, int value, string email)//for user
		{
			int? userid = context.orders.Where(x => x.Order_ID == orderid)
				.Select(x => x.User_ID)
				.FirstOrDefault();
			var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
			
			if (userid == null || delivery == null)
			{
				return null;
			}

			var user_email = context.users.Where(x => x.User_ID ==userid)
				.Select(x=>x.Email) .FirstOrDefault();


			List<int> rate = context.ratings.Where(x => x.Delivery_ID == delivery.Delivery_ID)
				.Select(x => x.Value).ToList();

			if (rate.Count() == 0)
			{
				ViewOfferForUserDTO view = new ViewOfferForUserDTO() // #### Hub ####
				{
					order_id = orderid,
					delivery_email = email,
					delivery_name = delivery.Name,
					delivery_photo = delivery.Photo,
					delivery_avg_rate = 0,
					delivery_count_rate = 0,
					//delivery_id = delivery.Delivery_ID,
					//userid = userid,
					offer_value = value,
				};
				CheckNotificationDTO check = new CheckNotificationDTO()
				{
					email = user_email,
					type = "User"
				};
				NewOfferForUser.Clients.All.SendAsync("NotifyNewOfferForUser", view,check);
				return view;
			}

			else
			{
			
				ViewOfferForUserDTO view = new ViewOfferForUserDTO() // #### Hub ####
				{
					order_id = orderid,
					delivery_email = email,
					delivery_name = delivery.Name,
					delivery_photo = delivery.Photo,
					//delivery_id = delivery.Delivery_ID,
					//userid = userid,
					offer_value = value,
					delivery_avg_rate = Math.Round(rate.Average(), 1),
					delivery_count_rate = rate.Count() 
				};

				CheckNotificationDTO check = new CheckNotificationDTO()
				{
					email = user_email,
					type = "User"
				};
				NewOfferForUser.Clients.All.SendAsync("NotifyNewOfferForUser", view, check);
				return view;
			}
		}

		public int DeliveryAcceptOffer(int orederid,string email)
		{
			
				var order = context.orders.FirstOrDefault(x=>x.Order_ID == orederid);
				var delivery = context.delivers.FirstOrDefault(x=>x.Email == email);
				if (order == null&& delivery == null)
				{
					return -1;//error during processing please try again
				}
				order.Delivery_ID = delivery.Delivery_ID;
				int raw = context.SaveChanges();
				return raw;//####Hub####


		}

		public int UserAcceptOffer(int orederid,double price_of_offer
			,string email,string state)
		{
			if(state == "Accept")
			{
				var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
				var order = context.orders.FirstOrDefault(x => x.Order_ID == orederid);
				if (order == null)
				{
					return -1;//error during processing please try again
				}
				order.Delivery_ID = delivery.Delivery_ID;
				order.Price = price_of_offer;
				int raw = context.SaveChanges();
				if (raw == 1)
				{
					var user = context.users.FirstOrDefault(x => x.User_ID == order.User_ID);
					CheckNotificationDTO check = new CheckNotificationDTO()
					{
						email = email,
						type = "Delivery"
					};
					acceptionHub.Clients.All.SendAsync("NotifyOfAcceptOrDeclineForDeliveryOffer",
						state, price_of_offer, orederid, user.Name,user.Phone
						,user.Orders.Count, check);
				}
				return raw;//####Hub####
			}

			else
			{
				var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
				var order = context.orders.FirstOrDefault(x => x.Order_ID == orederid);
				if (order == null)
				{
					return -1;//error during processing please try again
				}
				           //order.Delivery_ID = delivery.Delivery_ID;
				
					var user = context.users.FirstOrDefault(x => x.User_ID == order.User_ID);
					CheckNotificationDTO check = new CheckNotificationDTO()
					{
						email = email,
						type = "Delivery"
					};
					acceptionHub.Clients.All.SendAsync("NotifyOfAcceptOrDeclineForDeliveryOffer",
						state, price_of_offer, orederid, user.Name, user.Photo
						, user.Orders.Count, check);
				
				return -2;//####Hub####
			}
				

		}


	}
}
