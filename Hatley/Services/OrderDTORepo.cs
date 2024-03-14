using Hatley.DTO;
using Hatley.Models;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace Hatley.Services
{
	public class OrderDTORepo : IOrderDTORepo
	{
		private readonly Order order;
		private readonly appDB context;

		public OrderDTORepo(Order _order, appDB _context)
		{
			order = _order;
			context = _context;
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
				Id = x.Order_ID,
				description = x.description,
				location = x.location,
				price = x.Price,
				Status = x.Status,
				User_ID = x.User_ID
			}).ToList();
			return ordersdto;
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
				Id = order.Order_ID,
				description = order.description,
				location = order.location,
				price = order.Price,
				Status = order.Status,
				User_ID = order.User_ID

			};
			return orderdto;
		}

		public int Create(OrderDTO orderdto)
		{
			if (orderdto.User_ID == null)
			{
				return -1;
			}

			var checkuserid=context.users.FirstOrDefault(x=>x.User_ID==orderdto.User_ID);
			if (checkuserid == null)
			{
				return -2;
			}

			order.description = orderdto.description;
			order.location = orderdto.location;
			order.Price = orderdto.price;
			//order.Status = orderdto.Status;
			order.User_ID = orderdto.User_ID;
			context.orders.Add(order);
			int raw = context.SaveChanges();
			return raw;
		}

		public int Update(int id, OrderDTO orderdto)
		{
			var oldorder = context.orders.FirstOrDefault(x => x.Order_ID == id);
			if (oldorder == null)
			{
				return -1;
			}
			oldorder.description = orderdto.description;
			oldorder.location = orderdto.location;
			oldorder.Price = orderdto.price;
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
