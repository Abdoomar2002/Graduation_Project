using Hatley.DTO;

namespace Hatley.Services
{
	public interface IOrderDTORepo
	{
		int Create(OrderDTO orderdto);
		int Delete(int id);
		OrderDTO? GetOrder(int id);
		List<OrderDTO>? GetOrders();
		List<OrderDTO>? GetOrdersForUserOrDelivery(string mail, string type);
		int Update(int id, OrderDTO orderdto);
	}
}