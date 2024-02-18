using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
	public class CommentDTO
	{
		[Key]
		public int Id { get; set; }
		[MaxLength(1000)]
		[Required]
		public string Text { get; set; }
		public DateTime CreatedAt { get; set; }

		public int Delivery_ID { get; set; }

	}
}
