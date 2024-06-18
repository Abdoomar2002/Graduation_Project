using Hatley.DTO;

namespace Hatley.Services
{
	public interface IOfferDTORepo
	{
		OfferDTO? Display_Offer_Of_Order(int orderId, string email);
		ViewOfferForUserDTO? ViewOffer(int orderid, int value, string email);
		int DeliveryAcceptOffer(int orederid, string email);
		int UserAcceptOffer(int orederid, double price_of_offer, string email, string state);
	}
}