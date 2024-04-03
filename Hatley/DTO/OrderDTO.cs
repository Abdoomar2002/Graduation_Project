using Hatley.Models;
using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
	public class OrderDTO
	{
		public int Id { get; set; }
		public string description { get; set; }
		public string? order_Governorate { get; set; }
		public string? order_Zone { get; set; }
		public double? north { get; set; }
		public double? east { get; set; }
		public DateTime? created { get; set; }
		public DateTime order_time { get; set; }
		public double price { get; set; }
		public int? status { get; set; }
		public int? User_ID { get; set; }
		public int? Delivery_ID { get; set; }

	}
}
