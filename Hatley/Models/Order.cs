using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hatley.Models
{
	public class Order
	{
		[Key]
		public int Order_ID { get; set; }
		[MaxLength(2000)]
		[Required]
		public string description { get; set; }
		[Required]
		public string location { get; set; }
		[Required]
		public double Price { get; set; }
		public enum option { not_complete, on_prosess, complete }
		public option status { get; set; }
		public int? Delivery_ID { get; set; }
		[ForeignKey("Delivery_ID")]
		public Delivery? delivery { get; set; }
		public int? User_ID { get; set; }
		[ForeignKey("User_ID")]

		public User? User { get; set; }
	}
}
