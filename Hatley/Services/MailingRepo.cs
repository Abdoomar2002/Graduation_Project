using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using MimeKit;
using Hatley.DTO;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace SendEmailsWithDotNet5.Services
{
	public class MailingRepo : IMailingRepo
	{
		private readonly IConfiguration confg;

		public MailingRepo(IConfiguration _confg)
		{
			confg = _confg;
		}

		public async Task SendEmailAsync(string name, string mailTo, string phone, string order_ID, string body)
		{
			var email = new MimeMessage
			{
				Sender = MailboxAddress.Parse(confg["MailSettings:Email"]),
				Subject = "Confirm arrival"
			};

			email.To.Add(MailboxAddress.Parse(mailTo));

			var builder = new BodyBuilder();


			builder.HtmlBody = "Dear " + name + "<br>" +
				   "Your message: " + body + "<br>" +
				   "About order ID: " + order_ID + " ,and your phone is: " + phone + "<br>" +
				   "It has arrived and you will be answered within 48 hours.<br>";



			email.Body = builder.ToMessageBody();
			email.From.Add(new MailboxAddress(confg["MailSettings:DisplayName"], confg["MailSettings:Email"]));

			using var smtp = new SmtpClient();
			smtp.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true; // Ignore SSL certificate validation
			smtp.Connect(confg["MailSettings:Host"], Convert.ToInt32(confg["MailSettings:Port"]), SecureSocketOptions.StartTls);
			smtp.Authenticate(confg["MailSettings:Email"], confg["MailSettings:Password"]);
			await smtp.SendAsync(email);

			smtp.Disconnect(true);
		}
	}
}