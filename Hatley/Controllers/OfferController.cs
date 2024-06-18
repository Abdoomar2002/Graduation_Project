using Hatley.DTO;
using Hatley.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

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


		[HttpGet]
		public IActionResult DisplayOffer([FromQuery][Required] int orderid)
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
		public IActionResult ViewOffer([FromQuery][Required] int orderid
			,[FromQuery][Required] int value,[FromQuery][Required] string email)
		{
			if (type != "User" || type != "Delivery")
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
		public IActionResult DeliveryAcceptOffer([FromQuery][Required]int orderid)
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
		public IActionResult UserAcceptOffer([FromQuery][Required]int orderid
			, [FromQuery][Required] double price_of_offer
			, [FromQuery][Required]string delivery_email
			, [FromQuery][Required] string state)
		{
			if (type != "User")
			{
				return Unauthorized();
			}
			int raw = repo.UserAcceptOffer(orderid, price_of_offer, delivery_email, state);
			if (raw == 0)
			{
				return BadRequest("error while accept offer please try again");
			}
			else if (raw == -1)
			{
				return BadRequest("error during processing please try again");
			}
			else if (raw == -2)
			{
				Ok("Decline offer successfully");
			}
			return Ok("Accept offer successfully");
		}
	}
}
