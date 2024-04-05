using MailKit.Security;
using Microsoft.AspNetCore.Http.HttpResults;
using MailKit.Net.Smtp;
using MimeKit;
using System.Net;
using MimeKit;

namespace Hatley.Services
{
    public class MailReset : IMailReset
    {
        private readonly IConfiguration confg;
        public MailReset(IConfiguration confg)
        {
            this.confg = confg;
        }
        public async Task SendPasswordResetEmail(string name, string email, string token)
        {
            var mail = new MimeMessage
            {
                Sender = MailboxAddress.Parse(confg["MailSettings:Email"]),
                Subject = "Reset Password"
            };

            mail.To.Add(MailboxAddress.Parse(email));

            var build = new BodyBuilder();
            build.HtmlBody = "Dear " + name + "<br>" +
                   "Your verification code is " + token;

            mail.Body = build.ToMessageBody();
            mail.From.Add(new MailboxAddress(confg["MailSettings:DisplayName"], confg["MailSettings:Email"]));

            var smtp = new SmtpClient();
            smtp.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;
            smtp.Connect(confg["MailSettings:Host"], Convert.ToInt32(confg["MailSettings:Port"]), SecureSocketOptions.StartTls);
            smtp.Authenticate(confg["MailSettings:Email"], confg["MailSettings:Password"]);
            await smtp.SendAsync(mail);

            smtp.Disconnect(true);
        }
    }
}
