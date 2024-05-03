using Hatley.DTO;
using Hatley.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
			List<RatingDTO>? ratingsdtoforuserordelivery = repo.GetRatingsForUserOrDelivery(email,type);
			if (ratingsdtoforuserordelivery == null)
			{
				return BadRequest("No Records exist");
			}
			return Ok(ratingsdtoforuserordelivery);
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
		public IActionResult add(int value,int orderid)
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
					return NotFound("the order id not exist");
				}

				return Ok();
			}

			return BadRequest(ModelState);
		}


		[HttpPut("{id:int}")]
		public IActionResult edit(int id, int value)
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
