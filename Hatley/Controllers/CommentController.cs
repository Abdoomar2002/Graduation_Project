using Hatley.DTO;
using Hatley.Models;
using Hatley.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CommentController : ControllerBase
	{
		private readonly ICommentRepo repo;

		public CommentController(ICommentRepo _repo)
        {
			repo = _repo;
		}


		[HttpGet]
		public IActionResult getall()
		{
			List<CommentDTO>? commentsdto = repo.GetComments();
			if (commentsdto == null)
			{
				return BadRequest("No Records exist");
			}
			return Ok(commentsdto);
		}


		[HttpGet("{id:int}")]
		public IActionResult get(int id)
		{
			var comment = repo.GetComment(id);
			if (comment == null)
			{
				return NotFound("the order is not exist");
			}
			return Ok(comment);
		}


		[HttpPost]
		public IActionResult add(CommentDTO commentdto)
		{
			if (ModelState.IsValid == true)
			{
				int raw = repo.Create(commentdto);

				if (raw == 0)
				{
					return BadRequest("Error occur during save");
				}
				if (raw == -1)
				{
					return BadRequest("must enter id for delivery");
				}
				if (raw == -2)
				{
					return NotFound("the delivery not exist");
				}

				return Ok();
			}

			return BadRequest(ModelState);
		}


		[HttpPut("{id:int}")]
		public IActionResult edit(int id, CommentDTO commentdto)
		{
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

