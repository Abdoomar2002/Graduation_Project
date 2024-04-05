using Hatley.DTO;
using Hatley.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactMailController : ControllerBase
    {
        private readonly IContactMailRepository contactMail;
        public ContactMailController(IContactMailRepository contactMail) 
        {
            this.contactMail = contactMail;
        }
        [HttpPost("contact")]
        public async Task<IActionResult> contact([FromForm] ContactMailDTO contactDTO)
        {
            await contactMail.SendEmailAsync(contactDTO.name, contactDTO.email, contactDTO.phone, contactDTO.message);
            return Ok();
        }
    }
}
