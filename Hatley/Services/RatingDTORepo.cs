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
				rating_from = x.Rating_from,
				createdat = rating.CreatedAt,
				User_ID = x.User_ID,
				Delivery_ID = x.Delivery_ID
			}).ToList();
			return ratingsdto;
		}

		public List<RatingDTO>? GetRatingsForUserOrDelivery(string mail,string type)
		{
			if (type == "Delivery")
			{
				int deliveryrid = context.delivers
								.Where(x => x.Email == mail)
								.Select(x => x.Delivery_ID)
								.FirstOrDefault();

				List<Rating> ratings = context.ratings.Where(x => x.Delivery_ID == deliveryrid).ToList();
				if (ratings.Count == 0)
				{
					return null;
				}
				List<RatingDTO> ratingsdto = ratings.Select(x => new RatingDTO()
				{
					rating_id = x.Rating_ID,
					value = x.Value,
					rating_from = x.Rating_from,
					createdat = rating.CreatedAt,
					User_ID = x.User_ID,
					Delivery_ID = x.Delivery_ID
				}).ToList();
				return ratingsdto;
			}

			int userid = context.users
						.Where(x => x.Email == mail)
						.Select(x => x.User_ID)
						.FirstOrDefault();

			List<Rating> ratingsuser = context.ratings.Where(x => x.User_ID == userid).ToList();
			if (ratingsuser.Count == 0)
			{
				return null;
			}
			List<RatingDTO> ratingsdtouser = ratingsuser.Select(x => new RatingDTO()
			{
				rating_id = x.Rating_ID,
				value = x.Value,
				rating_from = x.Rating_from,
				createdat = rating.CreatedAt,
				User_ID = x.User_ID,
				Delivery_ID = x.Delivery_ID
			}).ToList();
			return ratingsdtouser;

		}

		public RatingDTO? GetRating(int id)
		{
			var rating = context.ratings.FirstOrDefault(x => x.Rating_ID == id);
			if (rating == null)
			{
				return null;
			}
			RatingDTO ratingdto = new RatingDTO()
			{
				rating_id = rating.Rating_ID,
				value = rating.Value,
				rating_from = rating.Rating_from,
				createdat = rating.CreatedAt,
				User_ID = rating.User_ID,
				Delivery_ID = rating.Delivery_ID


			};
			return ratingdto;
		}


		public int Create(int rate, int order_id,string mail,string type)
		{
			if (type == "Delivery")
			{
				string? createdfrom = context.delivers
					.Where(x => x.Email == mail)
					.Select(x => x.Name)
					.FirstOrDefault();
				
				int? createdto = context.orders.Where(x => x.Order_ID == order_id)
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

			string? creatfrom = context.users
					.Where(x => x.Email == mail)
					.Select(x => x.Name)
					.FirstOrDefault();
			int? creatto = context.orders.Where(x => x.Order_ID == order_id)
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
			return raw;
		}


		public int Update(int id, int value)
		{
			var oldrating = context.ratings.FirstOrDefault(x => x.Rating_ID == id);
			if (oldrating == null)
			{
				return -1;
			}
			oldrating.Value = value;
			int raw = context.SaveChanges();
			return raw;
		}

		public int Delete(int id)
		{
			var rating = context.ratings.FirstOrDefault(x => x.Rating_ID == id);
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
