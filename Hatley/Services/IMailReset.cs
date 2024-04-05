namespace Hatley.Services
{
    public interface IMailReset
    {
        Task SendPasswordResetEmail(string name, string email, string token);
    }
}
