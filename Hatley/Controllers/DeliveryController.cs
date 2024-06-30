using Hatley.DTO;
using Hatley.Models;
using Hatley.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hatley.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DeliveryController : ControllerBase
    {
        private readonly IDeliveryRepository deliveryRepository;
		private readonly string? userType;
		private readonly string? email;
		private readonly IHttpContextAccessor httpContextAccessor;
		public DeliveryController(IDeliveryRepository deliveryRepository,
            IHttpContextAccessor _httpContextAccessor, appDB context)
        {
            this.deliveryRepository = deliveryRepository;
			httpContextAccessor = _httpContextAccessor;
			email = httpContextAccessor.HttpContext?.User.Claims
                .FirstOrDefault(c => c.Type == "Email")?.Value;
			userType = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "type")?.Value;
		}


		[HttpGet]
        public IActionResult Displayall()
        {
			/*if (userType != "Admin")
			{
				return Unauthorized();
			}*/

			List<DeliveryDTO>? deliveryMen = deliveryRepository.Displayall();
            return Ok(deliveryMen);
        }


        [HttpGet("profile")]
        public IActionResult Display()
        {
			if (userType != "Delivery")
			{
				return Unauthorized();
			}

			ProfileDeliveryDTO? deliveryMan = deliveryRepository.Display(email);
            if(deliveryMan == null)
            {
                return NotFound("Not Found");
            }
            return Ok(deliveryMan);
        }


        [HttpGet("RatingsWithComments")]
        public IActionResult RatingWithCommentsForDelivery()
        {
            List<RatingsWithCommentsForDeliveryDTO> result =
                deliveryRepository.RatingsWithCommentsForDelivery(email);

            if(result == null)
            {
                return BadRequest("error occer");
            }
            return Ok(result);
        }


        [HttpPost]
        public async Task<IActionResult> Insert([FromForm]DeliveryDTO deliveryDTO,
			IFormFile frontImage, IFormFile backImage, IFormFile faceImage)
        {
            if(ModelState.IsValid == true)
            {
				deliveryDTO.Email = deliveryDTO.Email.ToLower();
				if (deliveryDTO.Email == "abdullahsalah219@gmail.com")
				{
					return BadRequest("The email not valid");
				}

				var raw = await deliveryRepository.Insert(deliveryDTO, frontImage, backImage, faceImage);
				if(raw == "0")

				{
					return BadRequest("The email already exists");
				}
				if (raw == "1")
				{
					return BadRequest("error in save");
				}
				if (raw == "2")
				{
					return Ok("Delivery created successfully.");
				}
				return BadRequest(raw);

			}
            return BadRequest(ModelState);
        }



		[HttpPost("uploadImage")]
		public async Task<IActionResult> uploadAsync(IFormFile? profile_img)
		{
			var path = await deliveryRepository.uploadImage(email, profile_img);

			
			return Ok(path);
		}



		[HttpPut]
        public IActionResult Edit([FromBody] DeliveryDTO person)
        {
			if (userType != "Delivery")
			{
				return Unauthorized();
			}

			if (ModelState.IsValid == true)
            {
                int raw = deliveryRepository.Edit(email, person);
                if (raw == 0)
                {
                    return NotFound("There is not delivery");
                }
                else if (raw == -1)
                {
                    return BadRequest("The email already exists");
                }
                return Ok();
            }
            return BadRequest(ModelState);
        }


		[HttpPost("changepassword")]
		public IActionResult change(ChangePasswordDTO change)
		{
			if (userType != "Delivery")
			{
				return Unauthorized();
			}
			int raw = deliveryRepository.ChangePassword(email, change);
			if (raw == -1)
			{
				return BadRequest("Old password not correct");
			}
			if (raw == 0)
			{
				return BadRequest("Error occur during saved ");
			}
			return Ok();
		}



		[HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
			if (userType != "Delivery")
			{
				return Unauthorized();
			}

			int raw = deliveryRepository.Delete(id);
            if (raw == -1)
            {
                return NotFound("There is not delivery");
            }
            return Ok();
        }


        /*[HttpPost("up")]
        public async Task<IActionResult> PostDelivery([FromForm] DeliveryDTO deliveryDTO,
            IFormFile frontImage, IFormFile backImage, IFormFile faceImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var delivery = new Delivery
                {
                    Name = deliveryDTO.Name,
                    Phone = deliveryDTO.Phone,
                    Email = deliveryDTO.Email,
                    Password = deliveryDTO.Password,
                    National_id = deliveryDTO.national_id,
                    Governorate_ID = deliveryDTO.Governorate_ID,
                    Zone_ID = deliveryDTO.Zone_ID
                };

                // Save images to wwwroot folder
                delivery.Front_National_ID_img = await SaveImage(frontImage);
                delivery.Back_National_ID_img = await SaveImage(backImage);
                delivery.Face_with_National_ID_img = await SaveImage(faceImage);

                context.delivers.Add(delivery);
                int r = await context.SaveChangesAsync();
                if (r == 0)
                {
                    return BadRequest(context);
                }
                return Ok("Delivery created successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private async Task<string> SaveImage(IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                return null;
            }

            var uploadsFolder = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = $"{Guid.NewGuid().ToString()}_{image.FileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            return filePath;
        }*/
    }
}

