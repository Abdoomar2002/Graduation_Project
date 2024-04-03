using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SendEmailsWithDotNet5.Dtos;
using SendEmailsWithDotNet5.Services;

namespace Hatley.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class MailingController : ControllerBase
	{
		private readonly IMailingRepo mailingrepo;

		public MailingController(IMailingRepo _mailingrepo)
		{
			mailingrepo = _mailingrepo;
		}

		[HttpPost("send")]
		public async Task<IActionResult> SendMail([FromForm] MailRequestDTO dto)
		{
			await mailingrepo.SendEmailAsync(dto.name, dto.toEmail, dto.phone, dto.order_ID, dto.body);
			return Ok();
		}
	}
}
