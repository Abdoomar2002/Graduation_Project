using Hatley.DTO;

namespace Hatley.Services
{
	public interface IUserDTORepo
	{
		UserDTO? Check(LoginDTO login);
		 Task<int> Create(UserDTO userdto, IFormFile? profile_img);
		Task<int> uploadImage(string email, IFormFile? profile_img);

        int Delete(int id);
		UserDTO? GetUser(string email);      
		List<UserDTO>? GetUsers();
		int Update(string email, UserDTO userdto);
		Task<int> Reset(string mail);

	}
}