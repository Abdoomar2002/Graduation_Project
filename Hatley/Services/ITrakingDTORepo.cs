using Hatley.DTO;

namespace Hatley.Services
{
	public interface ITrakingDTORepo
	{
		int ChangeStatus(string type, int order_id);
		List<TrakingDTO>? GetTrakingForUserOrDelivery(string email, string type);
	}
}