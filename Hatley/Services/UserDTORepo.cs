using Hatley.Controllers;
using Hatley.DTO;
using Hatley.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Linq;
namespace Hatley.Services
{
	public class UserDTORepo : IUserDTORepo
	{
		private readonly User user;
		private readonly appDB context;
		public UserDTORepo(User _user, appDB _con)
		{
			user = _user;
			context = _con;
		}

		public List<UserDTO>? GetUsers()
		{
			List<User> users = context.users.ToList();
			if (users == null)
			{
				return null;
			}
			List<UserDTO> usersdto = users.Select(x=> new UserDTO() {
				Id = x.User_ID,
				Name = x.Name,
				Email = x.Email,
				phone = x.phone,
				Password = x.Password
			}).ToList();

			return usersdto;
		}

		public UserDTO? GetUser(int id)
		{

			var user = context.users.FirstOrDefault(x => x.User_ID == id);
			if(user == null)
			{
				return null;
			}
			UserDTO userdto=new UserDTO()
			{
				Id = user.User_ID,
				Name = user.Name,
				Email =user.Email,
				phone=user.phone,
				Password=user.Password
			};
			//double av = user.Rate.Average();
			return userdto;
		}



		public int Create(UserDTO userdto)
		{
			var email= context.users.FirstOrDefault(x => x.Email == userdto.Email);
			if (email == null) { 
			user.Name = userdto.Name;
			user.Email = userdto.Email;
			user.phone = userdto.phone;
			user.Password = userdto.Password;
			context.users.Add(user);
			int raw = context.SaveChanges();
			return raw;
			}
			return 0;
			//context.users.Add(user);
			//int raw = context.SaveChanges();
			//return raw;
		}



		public int Update(int id, UserDTO userdto)
		{
			var olduser = context.users.FirstOrDefault(y => y.User_ID == id);
			var email = context.users.FirstOrDefault(x => x.Email == userdto.Email);

			if (olduser == null) 
			{ 
				return -2;
			}

			
			else if (email != null && email.User_ID == olduser.User_ID)
			{
				olduser.Name = userdto.Name;
				olduser.Email = userdto.Email;
				olduser.phone = userdto.phone;
				olduser.Password = userdto.Password;
				int ra = context.SaveChanges();
				return ra;
			}
			else if (email != null)
			{
				return -1;

			}
			olduser.Name = userdto.Name;
			olduser.Email = userdto.Email;
			olduser.phone = userdto.phone;
			olduser.Password = userdto.Password;
			int raw = context.SaveChanges();			
			return raw;
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

		
	}
}
