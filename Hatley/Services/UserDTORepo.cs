using Hatley.Controllers;
using Hatley.DTO;
using Hatley.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Text;
using System.Security.Cryptography;
using Microsoft.Extensions.Hosting.Internal;
using System.Collections.Generic;

namespace Hatley.Services
{
	public class UserDTORepo : IUserDTORepo
	{
		private readonly User user;
		private readonly appDB context;
		private readonly MailReset resetmail;
		private readonly IWebHostEnvironment hostingEnvironment;
		public UserDTORepo(User _user, appDB _con, IWebHostEnvironment hostingEnvironment, MailReset resetmail)
		{
			user = _user;
			context = _con;
			this.hostingEnvironment = hostingEnvironment;
			this.resetmail = resetmail;
		}

		public List<UserDTO>? GetUsers()
		{
			
			List<User> users = context.users.ToList();
			if (users == null)
			{
				return null;
			}
			List<UserDTO> usersdto = users.Select(x => new UserDTO()
			{
				Id = x.User_ID,
				Name = x.Name,
				Email = x.Email,
				phone = x.Phone,
				Password = x.Password,
				photo = x.Photo
			}).ToList();

			return usersdto;
		}

		public UserDTO? GetUser(string email)
		{

			var user = context.users.FirstOrDefault(x => x.Email == email);
			if (user == null)
			{
				return null;
			}
			UserDTO userdto = new UserDTO()
			{
				Id = user.User_ID,
				Name = user.Name,
				Email = user.Email,
				phone = user.Phone,
				Password = user.Password,
				photo = user.Photo
			};
			//double av = user.Rate.Average();
			return userdto;
		}

		public UserDTO? Check(LoginDTO login)
		{
			var user = context.users.FirstOrDefault(x => x.Email == login.Email);
			if (user == null)
			{
				return null;
			}

			UserDTO userdto = new UserDTO()
			{
				Id = user.User_ID,
				Name = user.Name,
				Email = user.Email,
				phone = user.Phone,
				Password = user.Password,
				photo = user.Photo
			};
			return userdto;
		}


		public async Task<int> Create(UserDTO userdto , IFormFile? profile_img)
		{
			var email = context.users.FirstOrDefault(x => x.Email == userdto.Email);
			var sha = SHA256.Create();
			var asByteArray = Encoding.Default.GetBytes(userdto.Password);
			var pass = sha.ComputeHash(asByteArray);
			var hashed = Convert.ToBase64String(pass);

			

			if (email == null)
			{
				
					user.Name = userdto.Name;
					user.Email = userdto.Email;
					user.Phone = userdto.phone;
					user.Password = hashed;
					user.Photo = await SaveImage(profile_img); 
					context.users.Add(user);
					int raw = await context.SaveChangesAsync();
					return raw;
				
				
			}
			return -1;

			//context.users.Add(user);
			//int raw = context.SaveChanges();
			//return raw;
		}


        public async Task<string> uploadImage(string email, IFormFile? profile_img)
		{
			var user = context.users.FirstOrDefault(x => x.Email == email);
            user.Photo = await SaveImage(profile_img);
            //context.users.Add(user);
            await context.SaveChangesAsync();
            return user.Photo;
        }

        private async Task<string?> SaveImage(IFormFile image)
		{
			if (image == null || image.Length == 0)
			{
				return null;
			}

			var uploadsFolder = Path.Combine(hostingEnvironment.WebRootPath, "User_imgs");
			if (!Directory.Exists(uploadsFolder))
			{
				Directory.CreateDirectory(uploadsFolder);
			}

			var uniqueFileName = $"{Guid.NewGuid().ToString()}_{image.FileName}";
			var filePath = Path.Combine(uploadsFolder, uniqueFileName);

			using (var fileStream = new FileStream(filePath, FileMode.Create))
			{
				await image.CopyToAsync(fileStream);
			}

			return Path.Combine("https:/hatley.runasp.net/", "User_imgs", uniqueFileName).Replace("\\", "/");
		}

		//################################################################
		public int Update(string mail, UserDTO userdto)
		{
			var olduser = context.users.FirstOrDefault(y => y.Email == mail);
			var email = context.users.FirstOrDefault(x => x.Email == userdto.Email);

			if (olduser == null)
			{
				return -2;
			}
			
			else if (email != null && email.User_ID == olduser.User_ID)
			{
				/*var sha = SHA256.Create();
				var asByteArray = Encoding.Default.GetBytes(userdto.Password);
				var pass = sha.ComputeHash(asByteArray);
				var hashed = Convert.ToBase64String(pass);*/

				olduser.Name = userdto.Name;
				olduser.Email = userdto.Email;
				olduser.Phone = userdto.phone;
				//olduser.Password = hashed;
				int ra = context.SaveChanges();
				return ra;
			}
			else if (email != null)
			{
				return -1;

			}

			/*var Sha = SHA256.Create();
			var AsByteArray = Encoding.Default.GetBytes(userdto.Password);
			var Pass = Sha.ComputeHash(AsByteArray);
			var Hashed = Convert.ToBase64String(Pass);*/

			olduser.Name = userdto.Name;
			olduser.Email = userdto.Email;
			olduser.Phone = userdto.phone;
			//olduser.Password = Hashed;
			int raw = context.SaveChanges();
			return raw;
		}



		public int ChangePassword (string email ,ChangePasswordDTO change)
		{
			var user = context.users.FirstOrDefault(x=>x.Email == email);

			var oldSha = SHA256.Create();
			var oldAsByteArray = Encoding.Default.GetBytes(change.old_password);
			var oldPass = oldSha.ComputeHash(oldAsByteArray);
			var oldHashed = Convert.ToBase64String(oldPass);

			if(oldHashed == user.Password)
			{
				var Sha = SHA256.Create();
				var AsByteArray = Encoding.Default.GetBytes(change.new_password);
				var Pass = Sha.ComputeHash(AsByteArray);
				var Hashed = Convert.ToBase64String(Pass);
				user.Password = Hashed;
				int raw = context.SaveChanges();
				return raw;
			}

			return -1;

		}


		public int Delete(int id)
		{
			var user = context.users.FirstOrDefault(z => z.User_ID == id);
			if (user != null)
			{
				context.users.Remove(user);
				int raw = context.SaveChanges();
				return raw;
			}
			return -1;
		}



		//######################
		public string resetPasswordCode()
		{
			const string allowedChars = "abcdefghijklmnopqrstuvwxyz1234567890";
			Random random = new Random();
			char[] code = new char[6];
			for (int i = 0; i < 6; i++)
			{
				code[i] = allowedChars[random.Next(allowedChars.Length)];
			}
			return new string(code);
		}
		public async Task<int> Reset(string mail)
		{
			var user = context.users.FirstOrDefault(z => z.Email == mail);
			if (user != null)
			{
				string code = resetPasswordCode();
				await resetmail.SendResetEmailAsync(user.Name, mail, code);

				var sha = SHA256.Create();
				var asByteArray = Encoding.Default.GetBytes(code);
				var pass = sha.ComputeHash(asByteArray);
				var hashed = Convert.ToBase64String(pass);

				user.Password = hashed;
				int raw = context.SaveChanges();
				if (raw == 1)
				{
					return raw;
				}
				return raw;
			}
			return -1;
		}

	}
}
