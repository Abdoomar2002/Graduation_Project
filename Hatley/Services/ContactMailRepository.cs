using MailKit.Net.Smtp;
using MimeKit;
using System.Net;
using MailKit.Security;

namespace Hatley.Services
{
	public class ContactMailRepository : IContactMailRepository
	{
		private readonly IConfiguration confg;
		public ContactMailRepository(IConfiguration confg)
		{
			this.confg = confg;
		}

		public async Task SendEmailAsync(string name, string email, string phone, string message)
		{
			var mail = new MimeMessage
			{
				Sender = MailboxAddress.Parse(confg["MailSettings:Email"]),
				Subject = "Confirm arrival"
			};

			mail.To.Add(MailboxAddress.Parse(email));

			var build = new BodyBuilder();
			build.HtmlBody = "Dear " + name + "<br>" +
				   "Thank you for contacting us. We will respond to you within 48 hours.<br>";

			mail.Body = build.ToMessageBody();
			mail.From.Add(new MailboxAddress(confg["MailSettings:DisplayName"], confg["MailSettings:Email"]));

			var smtp = new SmtpClient();
			smtp.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;
			smtp.Connect(confg["MailSettings:Host"], Convert.ToInt32(confg["MailSettings:Port"]), SecureSocketOptions.StartTls);
			smtp.Authenticate(confg["MailSettings:Email"], confg["Password"]);
			await smtp.SendAsync(mail);

			smtp.Disconnect(true);
		}
	}
}
