using Hatley.DTO;
using Hatley.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Services
{
    public interface IDeliveryRepository
    {
        List<DeliveryDTO>? Displayall();
        ProfileDeliveryDTO? Display(string email);
		List<RatingsWithCommentsForDeliveryDTO>? RatingsWithCommentsForDelivery
			(string email);
		Task<string> Insert([FromForm] DeliveryDTO deliveryDTO,
			IFormFile frontImage, IFormFile backImage, IFormFile faceImage);
		Task<string> uploadImage(string email, IFormFile? profile_img);
		int Edit(string email, DeliveryDTO person);
		int ChangePassword(string email, ChangePasswordDTO change);

		int Delete(int id);
        DeliveryDTO? Check(LoginDTO login);
		Task<int> Reset(string mail);

	}
}
