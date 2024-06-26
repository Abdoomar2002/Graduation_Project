using Hatley.DTO;
using Hatley.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Hatley.Services
{
	public class RatingDTORepo : IRatingDTORepo
	{
		private readonly Rating rating;
		private readonly appDB context;

		public RatingDTORepo(Rating _rating, appDB _context)
		{
			rating = _rating;
			context = _context;

		}


		public List<RatingDTO>? GetRatings()
		{
			List<Rating> ratings = context.ratings.ToList();
			if (ratings.Count == 0)
			{
				return null;
			}
			List<RatingDTO> ratingsdto = ratings.Select(x => new RatingDTO()
			{
				rating_id = x.Rating_ID,
				value = x.Value,
				name_from = x.Name_from,
				name_to = x.Name_to,
				createdat = x.CreatedAt,
				order_id = x.Order_ID,
				user_id = x.Id_for_user,
				delivery_id = x.Id_for_delivery
				//rating_from = x.Rating_from,

			}).ToList();
			return ratingsdto;
		}

		public List<RatingDTO>? GetRatingsForUserOrDelivery(string mail, string type)
		{
			if (type == "Delivery")
			{
				int deliveryrid = context.delivers
								.Where(x => x.Email == mail)
								.Select(x => x.Delivery_ID)
								.FirstOrDefault();

				List<Rating> ratings = context.ratings.Where(x => x.Id_for_delivery == deliveryrid).ToList();
				if (ratings.Count == 0)
				{
					return null;
				}
				List<RatingDTO> ratingsdto = ratings.Select(x => new RatingDTO()
				{
					rating_id = x.Rating_ID,
					value = x.Value,
					name_from = x.Name_from,
					name_to = x.Name_to,
					createdat = rating.CreatedAt,
					order_id = x.Order_ID,
					user_id = x.Id_for_user,
					delivery_id = x.Id_for_delivery
				}).ToList();
				return ratingsdto;
			}

			int userid = context.users
						.Where(x => x.Email == mail)
						.Select(x => x.User_ID)
						.FirstOrDefault();

			List<Rating> ratingsuser = context.ratings.Where(x => x.Id_for_user == userid).ToList();
			if (ratingsuser.Count == 0)
			{
				return null;
			}
			List<RatingDTO> ratingsdtouser = ratingsuser.Select(x => new RatingDTO()
			{
				rating_id = x.Rating_ID,
				value = x.Value,
				name_from = x.Name_from,
				name_to = x.Name_to,
				order_id = x.Order_ID,
				createdat = rating.CreatedAt,
				user_id = x.Id_for_user,
				delivery_id = x.Id_for_delivery
			}).ToList();
			return ratingsdtouser;

		}


		public List<Last5RatingForDeliveryDTO>? Last5(string email)
		{
			var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
			if (delivery == null)
			{
				return null;
			}

			List<Rating> last5Ratings = context.ratings
				.Where(x => x.Id_for_delivery == delivery.Delivery_ID)
				.OrderByDescending(x => x.CreatedAt)
				.Take(5)
				.ToList();
			if (last5Ratings.Count == 0)
			{
				return null;
			}

			List<Last5RatingForDeliveryDTO> last = last5Ratings.Select(x => new Last5RatingForDeliveryDTO()
			{
				name = x.Name_from,
				value = x.Value
			}).ToList();
			return last;

		}

		public RatingDTO? GetRating(int order_id)
		{
			var rating = context.ratings.FirstOrDefault(x => x.Order_ID == order_id);
			if (rating == null)
			{
				return null;
			}
			RatingDTO ratingdto = new RatingDTO()
			{
				rating_id = rating.Rating_ID,
				value = rating.Value,
				//rating_from = rating.Rating_from,
				createdat = rating.CreatedAt,
				name_from = rating.Name_from,
				name_to = rating.Name_to,
				order_id = rating.Order_ID,
				user_id = rating.Id_for_user,
				delivery_id = rating.Id_for_delivery


			};
			return ratingdto;
		}


		public int Create(int rate, int order_id)
		{
			var order = context.orders.FirstOrDefault(x => x.Order_ID == order_id);
			if (order == null || order.Delivery_ID == null)
			{
				return -1;
			}

			var check = context.ratings.FirstOrDefault(x => x.Order_ID == order_id);
			if (check != null)
			{
				return -2;
			}
			var user_name = context.users
				.Where(x => x.User_ID == order.User_ID)
				.Select(x => x.Name)
				.FirstOrDefault();

			var delvery_name = context.delivers
				.Where(x => x.Delivery_ID == order.Delivery_ID)
				.Select(x => x.Name)
				.FirstOrDefault();

			rating.Value = rate;
			rating.CreatedAt = DateTime.Now;
			rating.Name_from = user_name;
			rating.Name_to = delvery_name;
			rating.Order_ID = order_id;
			rating.Id_for_user = order.User_ID;
			rating.Id_for_delivery = order.Delivery_ID;
			context.ratings.Add(rating);
			int r = context.SaveChanges();
			return r;

			/*if (type == "Delivery")
			{
				string? createdfrom = context.delivers
					.Where(x => x.Email == mail)
					.Select(x => x.Name)
					.FirstOrDefault();
				
				int? createdto = context.orders
					.Where(x => x.Order_ID == order_id && x.Delivery_ID != null)
					.Select(x => x.User_ID)
					.FirstOrDefault();
				if(createdto == null)
				{
					return -1;
				}
				rating.Value = rate;
				rating.CreatedAt = DateTime.Now;
				rating.Rating_from = createdfrom;
				rating.User_ID = createdto;
				context.ratings.Add(rating);
				int r = context.SaveChanges();
				return r;
			}

			//********************** User ***********************

			string? creatfrom = context.users
					.Where(x => x.Email == mail)
					.Select(x => x.Name)
					.FirstOrDefault();
			int? creatto = context.orders
				.Where(x => x.Order_ID == order_id && x.Delivery_ID != null)
				.Select(x => x.Delivery_ID)
				.FirstOrDefault();
			if (creatto == null)
			{
				return -1;
			}

			rating.Value = rate;
			rating.CreatedAt = DateTime.Now;
			rating.Rating_from = creatfrom;
			rating.Delivery_ID = creatto;
			context.ratings.Add(rating);
			int raw = context.SaveChanges();
			return raw;*/
		}


		public int Update(int order_id, int value)
		{
			var oldrating = context.ratings.FirstOrDefault(x => x.Order_ID == order_id);
			if (oldrating == null)
			{
				return -1;
			}
			oldrating.Value = value;
			int raw = context.SaveChanges();
			return raw;
		}

		public int Delete(int order_id)
		{
			var rating = context.ratings.FirstOrDefault(x => x.Order_ID == order_id);
			if (rating != null)
			{
				context.ratings.Remove(rating);
				int raw = context.SaveChanges();
				return raw;
			}
			return -1;
		}

	}
}
