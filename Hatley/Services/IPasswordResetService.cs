namespace Hatley.Services
{
    public interface IPasswordResetService
    {
        Task<bool> GeneratePasswordResetTokenForUser(string email);
        Task<bool> GeneratePasswordResetTokenForDelivery(string email);
        Task<bool> ResetPassword(string email, string token, string newPassword);

    }
}
