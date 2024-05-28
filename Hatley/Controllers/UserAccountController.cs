using Hatley.DTO;
using Hatley.Models;
using Hatley.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
namespace Hatley.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserAccountController : ControllerBase
	{
		private readonly IUserDTORepo repo;
		private readonly IConfiguration config;
       // private readonly IPasswordResetService passwordResetService;
        private static readonly HashSet<string> Blacklist = new HashSet<string>();
        public UserAccountController(IUserDTORepo repo, IConfiguration config)
        {
			this.repo = repo;
			this.config = config;
			//this.passwordResetService = passwordResetService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromForm]UserDTO userdto,IFormFile? profile_img) 
		{
			if (ModelState.IsValid == true)
			{
				userdto.Email=userdto.Email.ToLower();
				if(userdto.Email == "abdullahsalah219@gmail.com")
				{
					return BadRequest("The email not valid");
				}

				int raw = await repo.Create(userdto,profile_img);

				if (raw == -1)
				{
					return BadRequest("The email already exists");
				}
				if (raw == 0)
				{
					return BadRequest("error in save");
				}
				return Ok("User created successfully.");
			}

			return BadRequest(ModelState);
		}



		[HttpPost("login")]
		public IActionResult Login([FromBody]LoginDTO login)
		{
			login.Email = login.Email.ToLower();

			var User = repo.Check(login);

			if (login.Email == "abdullahsalah219@gmail.com" &&
				login.Password == config["AdminPassword"])
			{
				var claims = new List<Claim>();
				claims.Add(new Claim("Email", "abdullahsalah219@gmail.com"));
				claims.Add(new Claim("type", "Admin"));
				claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

				SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]));
				SigningCredentials signincred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

				JwtSecurityToken newtoken = new JwtSecurityToken(
					issuer: config["JWT:ValidIssuer"],
					audience: config["JWT:ValidAudiance"],
					claims: claims,
					expires: DateTime.Now.AddHours(24),
					signingCredentials: signincred
					);
				return Ok(new
				{
					token = new JwtSecurityTokenHandler().WriteToken(newtoken),
					expiration = newtoken.ValidTo
				});
			}
			if (User != null)
			{
				var sha = SHA256.Create();
				var asByteArray = Encoding.Default.GetBytes(login.Password);
				var pass = sha.ComputeHash(asByteArray);
				var hashed = Convert.ToBase64String(pass);
				if (User.Password == hashed)
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
						expires: DateTime.Now.AddHours(24),
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
			return NotFound("Email not correct");
		}


        [HttpGet("logout")]
        public IActionResult logout()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            Blacklist.Add(token);
            return Ok(new { message = "Logout successful" });
        }


		[HttpGet("forget")]
		public async Task<IActionResult> forgetPassword([FromQuery][Required]string mail)
		{
			var raw = await repo.Reset(mail);
			if (raw == 1)
			{
				return Ok("Reset password code has been sent to your email.");
			}
			else if (raw == -1)
			{
				return NotFound("Email not exist");
			}
			return BadRequest();

		}
	}
}
