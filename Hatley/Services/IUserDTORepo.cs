using Hatley.DTO;
using Hatley.Models;

namespace Hatley.Services
{
	public interface IUserDTORepo
	{
		int Create(UserDTO userdto);
		int Delete(int id);
		UserDTO? GetUser(int id);
		List<UserDTO>? GetUsers();
		int Update(int id, UserDTO userdto);
	}
}