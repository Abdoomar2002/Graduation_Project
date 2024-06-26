using Hatley.DTO;

namespace Hatley.Services
{
	public interface IOfferDTORepo
	{
		int DeliveryAcceptOffer(int orederid, string email);
		OfferDTO? Display_Offer_Of_Order(int orderId, string email);
		int UserAcceptOffer(int orederid, double price_of_offer, string email);
		int UserDeclineOffer(int orederid, double price_of_offer, string email);
		ViewOfferForUserDTO? ViewOffer(int orderid, int value, string email);
	}
}