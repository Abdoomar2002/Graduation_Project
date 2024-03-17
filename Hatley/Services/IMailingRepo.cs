namespace SendEmailsWithDotNet5.Services
{
	public interface IMailingRepo
	{
		Task SendEmailAsync(string name, string mailTo, string phone, string order_ID, string body);
	}
}