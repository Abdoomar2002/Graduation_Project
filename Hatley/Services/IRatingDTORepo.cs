using Hatley.DTO;

namespace Hatley.Services
{
	public interface IRatingDTORepo
	{
		int Create(int rate, int order_id);
		int Delete(int order_id);
		RatingDTO? GetRating(int order_id);
		List<RatingDTO>? GetRatings();
		List<RatingDTO>? GetRatingsForUserOrDelivery(string mail, string type);
		List<Last5RatingForDeliveryDTO>? Last5(string email);
		int Update(int order_id, int value);
	}
}