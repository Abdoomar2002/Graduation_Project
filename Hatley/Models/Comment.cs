using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hatley.Models
{
	public class Comment
	{
		[Key]
		public int Comment_ID { get; set; }
		[MaxLength(1000)]
		[Required]
		public string Text { get; set; }

		public DateTime CreatedAt { get; set; }


		public int Delivery_ID { get; set; }
		[ForeignKey("Delivery_ID")]

		public Delivery Delivery { get; set; }
	}
}
