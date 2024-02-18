using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
	public class UserDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string phone { get; set; }
		[EmailAddress]
		public string Email { get; set; }
		public string Password { get; set; }

	}
}
