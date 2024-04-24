using Hatley.DTO;
using Hatley.Models;

namespace Hatley.Services
{
	public class OfferDTORepo : IOfferDTORepo
	{
		private readonly appDB context;

		public OfferDTORepo(appDB _context)
		{
			context = _context;
		}
		public OfferDTO? Display_Offer_Of_Order(int orderId, string email)
		{
			var order = context.orders.FirstOrDefault(x => x.Order_ID == orderId);

			var user = context.users.FirstOrDefault(x => x.User_ID == order.User_ID);
			List<int> rate = context.ratings.Where(x => x.User_ID == order.User_ID)
				.Select(x => x.Value).ToList();
			if (order == null || user == null)
			{
				return null;
			}

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
				user_avg_rate = rate.Average(),// may be zero here
				user_count_rate = rate.Count() // may be zero here
			};
			return offerdto;
		}

		public ViewOfferForUserDTO? ViewOffer(int orderid, int value, string email)
		{
			int? userid = context.orders.Where(x => x.Order_ID == orderid)
				.Select(x => x.User_ID)
				.FirstOrDefault();
			var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
			List<int> rate = context.ratings.Where(x => x.Delivery_ID == delivery.Delivery_ID)
				.Select(x => x.Value).ToList();
			if (userid == null || delivery == null)
			{
				return null;
			}

			ViewOfferForUserDTO view = new ViewOfferForUserDTO() // #### Hub ####
			{
				order_id = orderid,
				delivery_name = delivery.Name,
				delivery_id = delivery.Delivery_ID,
				userid = userid,
				offer_value = value,
				delivery_avg_rate = rate.Average(),// may be zero here
				delivery_count_rate = rate.Count() // may be zero here
			};
			return view;
		}
	}
}
