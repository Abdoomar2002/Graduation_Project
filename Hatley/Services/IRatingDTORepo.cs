using Hatley.DTO;

namespace Hatley.Services
{
	public interface IRatingDTORepo
	{
		int Create(int rate, int order_id, string mail, string type);
		int Delete(int id);
		RatingDTO? GetRating(int id);
		List<RatingDTO>? GetRatings();
		List<RatingDTO>? GetRatingsForUserOrDelivery(string mail, string type);
		int Update(int id, int value);
	}
}