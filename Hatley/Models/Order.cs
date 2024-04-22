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
		public string Description { get; set; }
		[Required]
		public string Order_governorate_from { get; set; }
		public string Order_zone_from { get; set; }
		public string? Order_governorate_to { get; set; }
		public string? Order_zone_to { get; set; }
		public double? North { get; set; }
		public double? East { get; set; }
		public DateTime Created { get; set; }
		public DateTime Order_time { get; set; }
		[Required]
		public double Price { get; set; }
		public int? Status { get; set; } = 0;
		public int? Delivery_ID { get; set; }
		[ForeignKey("Delivery_ID")]
		public Delivery? Delivery { get; set; }
		public int? User_ID { get; set; }
		[ForeignKey("User_ID")]
		public User? User { get; set; }
	}
}
