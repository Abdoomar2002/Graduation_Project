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
		private readonly IHttpContextAccessor httpContextAccessor;
		private readonly appDB context;
		public DeliveryController(IDeliveryRepository deliveryRepository,
            IHttpContextAccessor _httpContextAccessor, appDB context)
        {
            this.deliveryRepository = deliveryRepository;
			httpContextAccessor = _httpContextAccessor;
			this.context = context;
		}
		[HttpGet]
        public IActionResult Displayall()
        {
            List<DeliveryDTO>? deliveryMen = deliveryRepository.Displayall();
            return Ok(deliveryMen);
        }
        [HttpGet("{id:int}")]
        public IActionResult Display(int id)
        {
            DeliveryDTO? deliveryMan = deliveryRepository.Display(id);
            if(deliveryMan == null)
            {
                return NotFound("Not Found");
            }
            return Ok(deliveryMan);
        }
        [HttpPost]
        public async Task<IActionResult> Insert([FromForm]DeliveryDTO deliveryDTO,
			IFormFile frontImage, IFormFile backImage, IFormFile faceImage)
        {
            if(ModelState.IsValid == true)
            {
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
        [HttpPut("{id:int}")]
        public IActionResult Edit(int id, DeliveryDTO person)
        {
            if (ModelState.IsValid == true)
            {
                int raw = deliveryRepository.Edit(id, person);
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
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
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

