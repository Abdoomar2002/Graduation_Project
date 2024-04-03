using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hatley.Models
{
	public class Rating
	{
		[Key]
        public int Rating_ID { get; set; }
		public int Value { get; set; }
		public DateTime CreatedAt { get; set; }
		public string Rating_from { get; set; }
		public int? Delivery_ID { get; set; }
		[ForeignKey("Delivery_ID")]
		public Delivery? Delivery { get; set; }
		public int? User_ID { get; set; }
		[ForeignKey("User_ID")]
		public User? User { get; set; }
	}
}
