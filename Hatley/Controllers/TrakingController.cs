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
	public class TrakingController : ControllerBase
	{
		private readonly ITrakingDTORepo repo;
		private readonly string? email;
		private readonly string? type;
		private readonly IHttpContextAccessor httpContextAccessor;

		public TrakingController(ITrakingDTORepo _Repo, IHttpContextAccessor _httpContextAccessor)
		{
			repo = _Repo;
			httpContextAccessor = _httpContextAccessor;
			email = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "Email")?.Value;
			type = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "type")?.Value;

		}

		[HttpGet]
		public IActionResult Trakings()
		{
			List<TrakingDTO> trakingsDTO = repo.GetTrakingForUserOrDelivery(email, type);
			if(trakingsDTO == null)
			{
				return BadRequest("No exit orders");
			}
			return Ok(trakingsDTO);
		}


		[HttpGet("{orderid:int}")]
		public IActionResult ChangeStatus(int orderid)
		{
			if (type != "Delivery")
			{
				return Unauthorized();
			}

			int raw = repo.ChangeStatus(type, orderid);
			if(raw == 0)
			{
				return BadRequest("Error occured during find the order");
			}
			if (raw == 1)
			{
				return BadRequest("Order complete");
			}
			if (raw == 3)
			{
				return StatusCode(403);
			}
			if(raw == -1)
			{
				return BadRequest("Not allow");
			}
			return Ok();
		}

	}
}
