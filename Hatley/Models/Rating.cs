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
		public string Name_from { get; set; }
		public string Name_to { get; set; }
		public int Order_ID { get; set; }
		[ForeignKey("Order_ID")]
		public Order Order { get; set; }
		public int? Id_for_delivery { get; set; }
		public int? Id_for_user { get; set; }



		/*public string Rating_from { get; set; }
		[ForeignKey("Delivery_ID")]
		public Delivery? Delivery { get; set; }
		[ForeignKey("User_ID")]
		public User? User { get; set; }*/
	}
}
