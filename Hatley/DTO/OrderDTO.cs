using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
	public class OrderDTO
	{
		public int Id { get; set; }
		public string description { get; set; }
		public string location { get; set; }
		public double price { get; set; }
		public int? Status { get; set; }
		public int? User_ID { get; set; }
	}
}
