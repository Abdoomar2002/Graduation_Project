using Hatley.DTO;
using Hatley.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace Hatley.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class RatingController : ControllerBase
	{
		private readonly IRatingDTORepo repo;
		private readonly IHttpContextAccessor httpContextAccessor;
		private readonly string? email;
		private readonly string? type;
		public RatingController(IRatingDTORepo _Repo, IHttpContextAccessor _httpContextAccessor)
		{
			repo = _Repo;
			httpContextAccessor = _httpContextAccessor;
			email = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "Email")?.Value;
			type = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "type")?.Value;

		}


		[HttpGet]
		public IActionResult getall()
		{
			if (type != "Admin")
			{
				return Unauthorized();
			}

			List<RatingDTO>? ratingsdto = repo.GetRatings();
			if (ratingsdto == null)
			{
				return BadRequest("No Records exist");
			}
			return Ok(ratingsdto);
		}


		[HttpGet("Ratings")]
		public IActionResult getallforuserordelivery()
		{
			if (type != "Delivery")
			{
				return Unauthorized();
			}

			List<RatingDTO>? ratingsdtoforuserordelivery = repo.GetRatingsForUserOrDelivery(email,type);
			if (ratingsdtoforuserordelivery == null)
			{
				return BadRequest("No Records exist");
			}
			return Ok(ratingsdtoforuserordelivery);
		}


		[HttpGet("last5Ratings")]
		public IActionResult last5()
		{
			if (type != "Delivery")
			{
				return Unauthorized();
			}

			List<Last5RatingForDeliveryDTO> last5 = repo.Last5(email);
			if (last5 == null)
			{
				return BadRequest("error occur or no rating exist");
			}
			return Ok(last5);
		}


		[HttpGet("{id:int}")]
		public IActionResult get(int id)
		{
			var rating = repo.GetRating(id);
			if (rating == null)
			{
				return NotFound("the rating is not exist");
			}
			return Ok(rating);
		}


		[HttpPost]
		public IActionResult add([FromQuery][Required]int value
			,[FromQuery][Required]int orderid)
		{
			if (ModelState.IsValid == true)
			{
				int raw = repo.Create(value, orderid,email,type);

				if (raw == 0)
				{
					return BadRequest("Error occur during save");
				}
				if (raw == -1)
				{
					return NotFound("the order id not exist or the order has not been delivered yet");
				}

				return Ok();
			}

			return BadRequest(ModelState);
		}


		[HttpPut("{id:int}/{value:int}")]
		public IActionResult edit(int id,int value)
		{
			if (ModelState.IsValid == true)
			{
				int raw = repo.Update(id, value);
				if (raw == -1)
				{
					return NotFound("the rating not exist");
				}
				if (raw == 0)
				{
					return BadRequest("Error occur during save");
				}
				return Ok();
			}
			return BadRequest(ModelState);
		}


		[HttpDelete("{id:int}")]
		public IActionResult delete(int id)
		{
			int raw = repo.Delete(id);
			if (raw == -1)
			{
				return NotFound("the rating not exist");
			}
			if (raw == 0)
			{
				return BadRequest("Error occur during delete");
			}
			return Ok();
		}
	}
}
