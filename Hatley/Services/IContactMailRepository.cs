namespace Hatley.Services
{
    public interface IContactMailRepository
    {
        Task SendEmailAsync(string name, string email, string phone, string message);
    }
}
