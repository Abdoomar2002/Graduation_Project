using Hatley.DTO;

namespace Hatley.Services
{
	public interface IUserDTORepo
	{
		UserDTO? Check(LoginDTO login);
		int Create(UserDTO userdto);
		int Delete(int id);
		UserDTO? GetUser(string email);      
		List<UserDTO>? GetUsers();
		int Update(int id, UserDTO userdto);
		Task<int> Reset(string mail);

	}
}