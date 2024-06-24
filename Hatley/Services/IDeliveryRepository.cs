using Hatley.DTO;
using Hatley.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Services
{
    public interface IDeliveryRepository
    {
        List<DeliveryDTO>? Displayall();
        DeliveryDTO? Display(string email);
		Task<string> Insert([FromForm] DeliveryDTO deliveryDTO,
			IFormFile frontImage, IFormFile backImage, IFormFile faceImage);
		Task<int> uploadImage(string email, IFormFile? profile_img);
		int Edit(int id, DeliveryDTO person);
        int Delete(int id);
        DeliveryDTO? Check(LoginDTO login);
		Task<int> Reset(string mail);

	}
}
