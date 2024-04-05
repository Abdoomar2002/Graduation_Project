using Hatley.DTO;
using Hatley.Models;
using Hatley.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace Hatley.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserAccountController : ControllerBase
	{
		private readonly IUserDTORepo repo;
		private readonly IConfiguration config;
        private readonly IPasswordResetService passwordResetService;
        private static readonly HashSet<string> Blacklist = new HashSet<string>();
        public UserAccountController(IUserDTORepo repo, IConfiguration config, IPasswordResetService passwordResetService)
        {
			this.repo = repo;
			this.config = config;
			this.passwordResetService = passwordResetService;
		}
		[HttpPost("register")]
        public IActionResult Rigister(UserDTO userdto) 
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
		}

		[HttpPost("login")]
		public IActionResult Login(LoginDTO login)
		{
			var User = repo.Check(login);
			if (User != null)
			{
				if(User.Password == login.Password)
				{
					//Claims Token
					var claims = new List<Claim>();
					claims.Add(new Claim("Email", User.Email));
					claims.Add(new Claim("type", "User"));
					claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

					//get role
					
					SecurityKey securityKey =
						new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]));

					SigningCredentials signincred =
						new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
					//Create token
					JwtSecurityToken mytoken = new JwtSecurityToken(
						issuer: config["JWT:ValidIssuer"],//url web api
						audience: config["JWT:ValidAudiance"],//url consumer angular
						claims: claims,
						expires: DateTime.Now.AddHours(1),
						signingCredentials: signincred
						);
					return Ok(new
					{
						token = new JwtSecurityTokenHandler().WriteToken(mytoken),
						expiration = mytoken.ValidTo
					});
				}
				return BadRequest("Password not correct");
			}
			return Unauthorized();
		}
        [HttpGet("logout")]
        public IActionResult logout()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            Blacklist.Add(token);
            return Ok(new { message = "Logout successful" });
        }
        [HttpGet("forget")]
        public async Task<IActionResult> ForgotPassword(UserDTO user)
        {
            var result = await passwordResetService.GeneratePasswordResetTokenForUser(user.Email);
            if (result)
                return Ok("Password reset mail sent to your email.");

            return BadRequest("User not found.");
        }
        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(LoginDTO reset)
        {
            var result = await passwordResetService.ResetPassword(reset.Email, reset.ResetToken, reset.Password);
            if (result)
                return Ok("Password reset successful.");

            return BadRequest("Invalid token or email.");
        }
    }
}
