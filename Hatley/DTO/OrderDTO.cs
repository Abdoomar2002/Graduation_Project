using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
	public class OrderDTO
	{
		public int Id { get; set; }
		public string description { get; set; }
		public string location { get; set; }
		public double price { get; set; }
		public enum option { not_complete, on_prosess, complete }
		public option status { get; set; }
		public int? User_ID { get; set; }
	}
}
