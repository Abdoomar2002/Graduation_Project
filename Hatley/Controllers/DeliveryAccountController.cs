using Hatley.DTO;
using Hatley.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Hatley.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryAccountController : ControllerBase
    {
        private readonly IDeliveryRepository deliveryRepo;
        private readonly IConfiguration config;
       // private readonly IPasswordResetService passwordResetService;
        private static readonly HashSet<string> Blacklist = new HashSet<string>();

        public DeliveryAccountController(IDeliveryRepository deliveryRepo, IConfiguration config)
        {
            this.deliveryRepo = deliveryRepo;
            this.config = config;
           // this.passwordResetService = passwordResetService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Insert([FromForm]DeliveryDTO deliveryDTO,
			IFormFile frontImage, IFormFile backImage, IFormFile faceImage)
        {
            if(ModelState.IsValid == true)
            {
				deliveryDTO.Email = deliveryDTO.Email.ToLower();
				if (deliveryDTO.Email == "abdullahsalah219@gmail.com")
				{
					return BadRequest("The email not valid");
				}

				var raw = await deliveryRepo.Insert(deliveryDTO, frontImage, backImage, faceImage);
                if (raw == "0")
                {
                    return BadRequest("The email already exists");
                }
				if (raw == "1")
				{
					return BadRequest("error in save");
				}
				if (raw == "2")
				{
					return Ok("Delivery created successfully.");
				}
				return BadRequest(raw);
            }
            return BadRequest(ModelState);
        }
        [HttpPost("login")]
        public IActionResult Login(LoginDTO login)
        {
            login.Email = login.Email.ToLower();

            var deliveryman = deliveryRepo.Check(login);

            if(login.Email== "abdullahsalah219@gmail.com" &&
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
					expires: DateTime.Now.AddHours(1),
					signingCredentials: signincred
					);
				return Ok(new
				{
					token = new JwtSecurityTokenHandler().WriteToken(newtoken),
					expiration = newtoken.ValidTo
				});
			}

            if (deliveryman != null)
            {
				var sha = SHA256.Create();
				var asByteArray = Encoding.Default.GetBytes(login.Password);
				var pass = sha.ComputeHash(asByteArray);
				var hashed = Convert.ToBase64String(pass);
				if (deliveryman.Password == hashed)
                {
                    var claims = new List<Claim>();
                    claims.Add(new Claim("Email", deliveryman.Email));
                    claims.Add(new Claim("type", "Delivery"));
                    claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                    SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]));
                    SigningCredentials signincred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                    JwtSecurityToken newtoken = new JwtSecurityToken(
                        issuer: config["JWT:ValidIssuer"],
                        audience: config["JWT:ValidAudiance"],
                        claims: claims,
                        expires: DateTime.Now.AddHours(1),
                        signingCredentials: signincred
                        );
                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(newtoken),
                        expiration = newtoken.ValidTo
                    });
                }
                return BadRequest("Password is not correct");
            }
            return Unauthorized("Email not correct");
        }

        [HttpGet("logout")]
        public IActionResult logout()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            Blacklist.Add(token);
            return Ok(new { message = "Logout successful" });
        }


		[HttpGet("forget")]
		public async Task<IActionResult> forgetPassword(string mail)
		{
			var raw = await deliveryRepo.Reset(mail);
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


		/*[HttpGet("forget")]
        public async Task<IActionResult> ForgotPassword(DeliveryDTO delivery)
        {
            var result = await passwordResetService.GeneratePasswordResetTokenForDelivery(delivery.Email);
            if (result)
                return Ok("Password reset link sent to your email.");

            return BadRequest("User not found.");
        }
        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(LoginDTO reset)
        {
            var result = await passwordResetService.ResetPassword(reset.Email, reset.ResetToken, reset.Password);
            if (result)
                return Ok("Password reset successful.");

            return BadRequest("Invalid token or email.");
        }*/


	}
}
