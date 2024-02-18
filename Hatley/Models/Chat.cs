using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hatley.Models
{
	public class Chat
	{
		[Key]
		public int Chat_ID { get; set; }
		[MaxLength(1000)]
		public string details { get; set; }

		public int User_ID { get; set; }
		[ForeignKey("User_ID")]

		public User user { get; set; }

		public int Delivery_ID { get; set; }
		[ForeignKey("Delivery_ID")]

		public Delivery Delivery { get; set; }
	}
}
