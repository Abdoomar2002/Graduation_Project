using Hatley.DTO;
using Hatley.Hubs;
using Hatley.Models;
using Microsoft.AspNetCore.SignalR;

namespace Hatley.Services
{
	public class TrakingDTORepo : ITrakingDTORepo
	{
		private readonly appDB context;
        private readonly IHubContext<NotifyChangeStatusForUserHub> statusHub;

        public TrakingDTORepo(appDB _context, IHubContext<NotifyChangeStatusForUserHub> statusHub)
		{
			context = _context;
			this.statusHub = statusHub;
		}

		public List<TrakingDTO>? GetTrakingForUserOrDelivery(string email, string type)
		{
			if (type == "Delivery")
			{
				var delivery = context.delivers.FirstOrDefault(x => x.Email == email);

				List<Order> trakings = context.orders.
					Where(x => x.Delivery_ID == delivery.Delivery_ID)
					.OrderBy(x => x.Status).ToList();

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
					to = x.Order_zone_to
					/*to=x.Order_zone_to != null ? x.Order_zone_to : context.zones
											.Where(y => y.North == x.North && y.East == x.East)
											.Select(y => y.Name)
											.FirstOrDefault(),*/



				}).ToList();
				return trakingsdto;
			}

			var user = context.users.FirstOrDefault(x => x.Email == email);

			List<Order> traking = context.orders.
				Where(x => x.User_ID == user.User_ID && x.Delivery_ID!=null)
				.OrderBy(x => x.Status).ToList();

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
				to = x.Order_zone_to,
				delivery_id = x.Delivery_ID
				/*to = x.Order_zone_to != null ? x.Order_zone_to : context.zones
										.Where(y => y.North == x.North && y.East == x.East)
										.Select(y => y.Name)
										.FirstOrDefault(),
*/


			}).ToList();
			return trakingdto;
		}

		public int ChangeStatus(string type, int order_id)
		{
			if (type == "Delivery")
			{
				var order = context.orders.FirstOrDefault(x => x.Order_ID == order_id);
				if (order.Delivery_ID == null)
				{
					return -1;
				}
				if (order == null)
				{
					return 0;
				}
				if (order.Status == 3)
				{
					return 1;
				}

				order.Status++;
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
					int? userid = order.User_ID;
					var email = context.users
                        .Where(x => x.User_ID == userid)
                        .Select(x => x.Email).FirstOrDefault();

					CheckNotificationDTO check = new CheckNotificationDTO()
					{
						email = email,
						type = "User"
					};
                    statusHub.Clients.All.SendAsync("NotifyChangeStatusForUser",
                        order.Status, order_id, check);
                }

                return raw;
			}
			return 3; // 403 forbidden
		}
	}
}
