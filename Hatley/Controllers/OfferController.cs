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
	public class OfferController : ControllerBase
	{
		private readonly IOfferDTORepo repo;
		private readonly string? email;
		private readonly string? type;
		private readonly IHttpContextAccessor httpContextAccessor;

		public OfferController(IOfferDTORepo _Repo, IHttpContextAccessor _httpContextAccessor)
		{
			repo = _Repo;
			httpContextAccessor = _httpContextAccessor;
			email = httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "Email")?.Value;
			type = httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "type")?.Value;

		}

		[HttpGet("{orderid:int}")]

		public IActionResult DisplayOffer(int orderid)
		{
			OfferDTO? offer = repo.Display_Offer_Of_Order(orderid,email);
			if(offer == null)
			{
				return BadRequest("Error occured during find the order");
			}
			return Ok(offer);
		}
		[HttpGet]
		public IActionResult ViewOffer(int orderid, int value, string email)
		{
			ViewOfferForUserDTO? view = repo.ViewOffer(orderid,value,email);
			if(view == null)
			{
				return BadRequest("Error occured");
			}
			return Ok(view);
		}
	}
}
