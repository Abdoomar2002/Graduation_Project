using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SendEmailsWithDotNet5.Dtos
{
	public class MailRequestDTO
	{
		[Required]
		public string name { get; set; }
		[Required]
		[EmailAddress]
		public string toEmail { get; set; }
        [Required]
        public string phone { get; set; }
		[Required]
		public string order_ID { get; set; }
		[Required]
		public string body { get; set; }
		
	}
}