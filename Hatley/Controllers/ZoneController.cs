using Hatley.DTO;
using Hatley.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ZoneController : ControllerBase
    {
        private readonly IZoneRepository zoneRepository;
		private readonly string? userType; 
		private readonly IHttpContextAccessor httpContextAccessor;
		public ZoneController (IZoneRepository zoneRepository, IHttpContextAccessor _httpContextAccessor)
        {
            this.zoneRepository = zoneRepository;
			httpContextAccessor = _httpContextAccessor;
			userType = httpContextAccessor.HttpContext?.User.Claims
                .FirstOrDefault(c => c.Type == "type")?.Value;

		}
		[HttpGet]
        public IActionResult Displayall()
        {
			if (userType != "Admin")
			{
				return Unauthorized();
			}

			List<ZoneDTO>? zones = zoneRepository.Displayall();
            return Ok(zones);
        }
        [HttpGet("{id:int}")]
        public IActionResult Display(int id)
        {
			if (userType != "Admin")
			{
				return Unauthorized();
			}

			ZoneDTO? zone = zoneRepository.Display(id);
            if (zone == null)
            {
                return NotFound("Not Found");
            }
            return Ok(zone);
        }
        [HttpPost]
        public IActionResult Insert(ZoneDTO item)
        {
			if (userType != "Admin")
			{
				return Unauthorized();
			}

			if (ModelState.IsValid == true)
            {
                var raw = zoneRepository.Insert(item);
                if (raw == 0)
                {
                    return BadRequest("The zone already exists");
                }
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpPut("{id:int}")]
        public IActionResult Edit(int id, ZoneDTO item)
        {
			if (userType != "Admin")
			{
				return Unauthorized();
			}

			if (ModelState.IsValid == true)
            {
                int raw = zoneRepository.Edit(id, item);
                if (raw == 0)
                {
                    return BadRequest("Zone already exists");
                }
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
			if (userType != "Admin")
			{
				return Unauthorized();
			}

			int raw = zoneRepository.Delete(id);
            if (raw == -1)
            {
                return NotFound("That zone is not found");
            }
            return Ok();
        }
    }
}
