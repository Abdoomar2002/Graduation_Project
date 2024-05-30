using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Hatley.Services;
using Hatley.Models;
using Hatley.DTO;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Hatley.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class UserController : ControllerBase
	{
		private readonly IUserDTORepo repo;
		private readonly string? userType;
		private readonly string? email;
		private readonly IHttpContextAccessor httpContextAccessor;
		public UserController(IUserDTORepo _Repo,IHttpContextAccessor _httpContextAccessor)
		{
			repo = _Repo;
			httpContextAccessor= _httpContextAccessor;
			userType = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "type")?.Value;
			email = httpContextAccessor.HttpContext?.User.Claims
				.FirstOrDefault(c => c.Type == "Email")?.Value;
		}



		[HttpGet]
		public IActionResult getall()
		{
			if (userType != "Admin")
			{
				return Unauthorized();
			}

			List<UserDTO>? usersdto = repo.GetUsers();
			return Ok(usersdto);
		}


		[HttpGet("profile")]
		public IActionResult get()
		{
			if (userType != "User")
			{
				return Unauthorized();
			}

			var userdto = repo.GetUser(email);
			if (userdto == null)
			{
				return NotFound("the user is not exist");
			}
			return Ok(userdto);
		}


        /*[HttpPost]
		public IActionResult add([FromBody] UserDTO userdto)
		{

			if (ModelState.IsValid == true)
			{

				int raw = repo.Create(userdto);
				if (raw == 0)
				{
					return BadRequest("The email already exists");
				}
				return Ok();
			}

			return BadRequest(ModelState);

		}*/
        [HttpPost("uploadImage")]
		public async Task<IActionResult> uploadAsync(IFormFile? profile_img)
		{
            var raw = await repo.uploadImage(email, profile_img);

			if(raw == 0)
			{
				return BadRequest("Photo was not saved");
			}
			return Ok("Uploaded successfully");
        }

        [HttpPut("{id:int}")]
		public IActionResult update(int id,[FromBody]UserDTO userdto)
		{
			if (userType != "User")
			{
				return Unauthorized();
			}

			if (ModelState.IsValid==true)
			{
				int raw=repo.Update(id, userdto);
				if (raw == -2)
				{
					return NotFound("the user is not exist");
				}
				else if (raw == -1)
				{
					return BadRequest("The email already exists");
				}

				else if(raw == 0)
				{
					return BadRequest("Error in update or not exist data changed");
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
				return NotFound("the user is not exist");

			}
			else if (raw == 0)
			{
				return BadRequest($"Could not delete {id}");
			}

			return Ok();
		}







    }
}
