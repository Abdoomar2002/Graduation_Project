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
			email = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "Email")?.Value;
			type = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "type")?.Value;

		}


		[HttpGet("{orderid:int}")]
		public IActionResult DisplayOffer(int orderid)
		{
			if (type != "Delivery")
			{
				return Unauthorized();
			}

			OfferDTO? offer = repo.Display_Offer_Of_Order(orderid,email);
			if(offer == null)
			{
				return BadRequest("Error occured during find the order");
			}
			return Ok(offer);
		}


		[HttpGet("View")]
		public IActionResult ViewOffer(int orderid, int value, string email)
		{
			if (type != "User")
			{
				return Unauthorized();
			}

			ViewOfferForUserDTO? view = repo.ViewOffer(orderid,value,email);
			if(view == null)
			{
				return BadRequest("Error occured");
			}
			return Ok(view);
		}


		[HttpGet("Delivery/Accept")]
		public IActionResult DeliveryAcceptOffer(int orderid)
		{
			if (type != "Delivery")
			{
				return Unauthorized();
			}

			int raw = repo.DeliveryAcceptOffer(orderid,email);
			if(raw == 0)
			{
				return BadRequest("error while accept offer please try again");
			}
			else if(raw == -1)
			{
				return BadRequest("error during processing please try again");
			}
			return Ok();
		}

		[HttpGet("User/Accept")]
		public IActionResult UserAcceptOffer(int orderid,string email)
		{
			if (type != "User")
			{
				return Unauthorized();
			}
			int raw = repo.UserAcceptOffer(orderid, email);
			if (raw == 0)
			{
				return BadRequest("error while accept offer please try again");
			}
			else if (raw == -1)
			{
				return BadRequest("error during processing please try again");
			}
			return Ok();
		}
	}
}
