using Hatley.DTO;
using Hatley.Models;
using Hatley.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class CommentController : ControllerBase
	{
		private readonly ICommentRepo repo;
		private readonly string? userType; 
		private readonly IHttpContextAccessor httpContextAccessor;
		private readonly string? email;

		public CommentController(ICommentRepo _repo,
			IHttpContextAccessor _httpContextAccessor)
        {
			repo = _repo;
			httpContextAccessor = _httpContextAccessor;
			userType = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "type")?.Value;
			email = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "Email")?.Value;

		}


		[HttpGet]
		public IActionResult getall()
		{
			/*if(userType != "Admin")
			{
				return Unauthorized();
			}*/

			List<CommentDTO>? commentsdto = repo.GetComments();
			if (commentsdto == null)
			{
				return BadRequest("No Records exist");
			}
			return Ok(commentsdto);
		}


		[HttpGet("Delivery")]
		public IActionResult GetAllForDelivery()
		{
			if (userType != "Admin" && userType != "Delivery")
			{
				return Unauthorized();
			}

			List<CommentDTO> comments = repo.CommentsForDelivery(email);
			if (comments == null)
			{
				return BadRequest("No record exist");
			}
			return Ok(comments);

		}

		[HttpGet("{id:int}")]
		public IActionResult get(int id)
		{
			if (userType != "Admin" && userType != "Delivery")
			{
				return Unauthorized();
			}

			var comment = repo.GetComment(id);
			if (comment == null)
			{
				return NotFound("the Comment is not exist");
			}
			return Ok(comment);
		}


		[HttpPost]
		public IActionResult add([FromBody]CommentDTO commentdto)
		{
			if (userType != "User")
			{
				return Unauthorized();
			}

			if (ModelState.IsValid == true)
			{
				int raw = repo.Create(commentdto);

				if (raw == 0)
				{
					return BadRequest("Error occur during save");
				}
				if (raw == -1)
				{
					return BadRequest("More than one comment is not allowed for the same order");
				}
				if (raw == -2)
				{
					return NotFound("the order id not exist");
				}

				return Ok();
			}

			return BadRequest(ModelState);
		}


		[HttpPut("{id:int}")]
		public IActionResult edit(int id,[FromBody]CommentDTO commentdto)
		{
			if (userType != "User")
			{
				return Unauthorized();
			}

			if (ModelState.IsValid == true)
			{
				int raw = repo.Update(id, commentdto);
				if (raw == -1)
				{
					return NotFound("the comment not exist");
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
			if (userType != "User")
			{
				return Unauthorized();
			}

			int raw = repo.Delete(id);
			if (raw == -1)
			{
				return NotFound("the comment not exist");
			}
			if (raw == 0)
			{
				return BadRequest("Error occur during delete");
			}
			return Ok();
		}
	}
}

