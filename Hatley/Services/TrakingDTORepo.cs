using Hatley.DTO;
using Hatley.Models;

namespace Hatley.Services
{
	public class TrakingDTORepo
	{
		private readonly appDB context;

		public TrakingDTORepo(appDB _context)
		{
			context = _context;
		}

		public List<TrakingDTO>? GetTrakingForUserOrDelivery(string email,string type)
		{
			if(type== "Delivery")
			{
				var delivery = context.delivers.FirstOrDefault(x => x.Email == email);
				List<Order> trakings = context.orders.Where(x => x.Delivery_ID == delivery.Delivery_ID && x.Status>4).ToList();
				if (trakings.Count == 0)
				{
					return null;
				}
				List<TrakingDTO> trakingsdto = trakings.Select(x => new TrakingDTO()
				{
					order_id = x.Order_ID,
					order_time = x.Order_time,
					status = x.Status,
					from = x.Order_zone_from,
					to=x.Order_zone_to
					/*to=x.Order_zone_to != null ? x.Order_zone_to : context.zones
											.Where(y => y.North == x.North && y.East == x.East)
											.Select(y => y.Name)
											.FirstOrDefault(),*/
					


				}).ToList();
				return trakingsdto;
			}

			var user = context.users.FirstOrDefault(x => x.Email == email);
			List<Order> traking = context.orders.Where(x => x.User_ID == user.User_ID && x.Status == 0).ToList();
			if (traking.Count == 0)
			{
				return null;
			}
			List<TrakingDTO> trakingdto = traking.Select(x => new TrakingDTO()
			{
				order_id = x.Order_ID,
				order_time = x.Order_time,
				status = x.Status,
				from = x.Order_zone_from,
				to=x.Order_zone_to
				/*to = x.Order_zone_to != null ? x.Order_zone_to : context.zones
										.Where(y => y.North == x.North && y.East == x.East)
										.Select(y => y.Name)
										.FirstOrDefault(),
*/


			}).ToList();
			return trakingdto;
		}

		public int ChangeStatus (string type ,int order_id)
		{
			if(type == "Delivery")
			{
				var order = context.orders.FirstOrDefault(x => x.Order_ID == order_id);
				if (order == null)
				{
					return 0;
				}
				if (order.Status == 4)
				{
					return 1;
				}
				order.Status++;
				return 2;
			}
			return 3; // 403 forbidden
		}
	}
}
