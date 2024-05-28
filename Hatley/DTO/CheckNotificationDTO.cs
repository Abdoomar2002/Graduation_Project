using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
	public class CheckNotificationDTO
	{
		[EmailAddress]
		public string email { get; set; }
		public string type { get; set; }
	}
}
