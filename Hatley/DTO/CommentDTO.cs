using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
	public class CommentDTO
	{
		[Key]
		public int Id { get; set; }
		[MaxLength(1000,ErrorMessage = "The description must be less than 1000 characters.")]
		[Required]
		public string Text { get; set; }
		public DateTime CreatedAt { get; set; }

		public int Delivery_ID { get; set; }

	}
}
