using Hatley.DTO;

namespace Hatley.Services
{
	public interface IUserDTORepo
	{
		UserDTO? Check(LoginDTO login);
		int Create(UserDTO userdto);
		int Delete(int id);
		UserDTO? GetUser(int id);
		List<UserDTO>? GetUsers();
		int Update(int id, UserDTO userdto);
	}
}