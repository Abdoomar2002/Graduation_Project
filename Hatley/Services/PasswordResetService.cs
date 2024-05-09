/*using Hatley.Models;
using MailKit;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Hatley.Services
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly appDB context;
        private readonly IMailReset mailReset;
        private readonly IConfiguration config;


        public PasswordResetService(appDB context, IMailReset mailReset)
        {
            this.context = context;
            this.mailReset = mailReset;
        }
        public async Task<bool> GeneratePasswordResetTokenForUser(string email)
        {
            var user = await context.users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return false;


            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, email));
            claims.Add(new Claim("type", "Delivery"));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Secret"]));
            SigningCredentials signincred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken newtoken = new JwtSecurityToken(
                issuer: config["JWT:ValidIssuer"],
                audience: config["JWT:ValidAudiance"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signincred
                );
            var token = new JwtSecurityTokenHandler().WriteToken(newtoken);
            var expiration = newtoken.ValidTo;

            user.ResetTokenForUser = token;
            await context.SaveChangesAsync();
            mailReset.SendPasswordResetEmail(user.Name, user.Email, token);

            return true;
        }
        public async Task<bool> GeneratePasswordResetTokenForDelivery(string email)
        {
            var user = await context.delivers.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return false;


            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, email));
            claims.Add(new Claim("type", "Delivery"));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Secret"]));
            SigningCredentials signincred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken newtoken = new JwtSecurityToken(
                issuer: config["JWT:ValidIssuer"],
                audience: config["JWT:ValidAudiance"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signincred
                );
            var token = new JwtSecurityTokenHandler().WriteToken(newtoken);
            var expiration = newtoken.ValidTo;

            user.ResetTokenForDelivery = token;
            await context.SaveChangesAsync();
            mailReset.SendPasswordResetEmail(user.Name, user.Email, token);

            return true;
        }
        public async Task<bool> ResetPassword(string email, string token, string newPassword)
        {
            var user = await context.users.SingleOrDefaultAsync(u => u.Email == email && u.ResetTokenForUser == token);
            if (user == null)
                return false;

            user.Password = newPassword;
            user.ResetTokenForUser = null; 
            await context.SaveChangesAsync();

            return true;
        }
        public async Task<bool> ResetPasswordd(string email, string token, string newPassword)
        {
            var user = await context.delivers.SingleOrDefaultAsync(u => u.Email == email && u.ResetTokenForDelivery == token);
            if (user == null)
                return false;

            user.Password = newPassword;
            user.ResetTokenForDelivery = null;
            await context.SaveChangesAsync();

            return true;
        }
    }
}
*/