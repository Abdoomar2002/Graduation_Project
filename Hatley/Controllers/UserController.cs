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
		private readonly IHttpContextAccessor httpContextAccessor;
		public UserController(IUserDTORepo _Repo,IHttpContextAccessor _httpContextAccessor)
		{
			repo = _Repo;
			httpContextAccessor= _httpContextAccessor;
			userType = httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "type")?.Value;
			
		}

		

		[HttpGet]
		public IActionResult getall()
		{
			if(userType== "Delivery")
			{
				return Unauthorized();
			}

			List<UserDTO>? usersdto = repo.GetUsers();
			return Ok(usersdto);
		}


		[HttpGet("{id:int}")]
		public IActionResult get(int id)
		{
			if (userType == "Delivery")
			{
				return Unauthorized();
			}

			var userdto = repo.GetUser(id);
			if (userdto == null)
			{
				return NotFound("the user is not exist");
			}
			return Ok(userdto);
		}


		[HttpPost]
		public IActionResult add(UserDTO userdto)
		{
			if (userType == "Delivery")
			{
				return Unauthorized();
			}

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

		}


		[HttpPut("{id:int}")]
		public IActionResult update([FromRoute]int id,UserDTO userdto)
		{
			if (userType == "Delivery")
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
			if (userType == "Delivery")
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
