namespace Hatley.Services
{
    public interface IMailReset
    {
        Task SendResetEmailAsync(string name, string email, string code);
    }
}
