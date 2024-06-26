using Hatley.DTO;

namespace Hatley.Services
{
	public interface IOrderDTORepo
	{
		int Create(OrderDTO orderdto,string email);
		int Delete(int id);
		OrderDTO? GetOrder(int id);
		List<OrderDTO>? GetOrders();
		List<RelatedOrdersForDeliveryDTO>? DisplayRelatedOrdersForDelivery(string email);
		List<RelatedOrdersForDeliveryDTO>? DisplayUnRelatedOrdersForDelivery(string email);
		List<RelatedOrdersForDeliveryDTO>? GetOrdersForUserOrDelivery(string mail, string type);
		List<DeliveriesUserDTO>? Deliveries(string email);       
		int Update(int id, OrderDTO orderdto);
	}
}