using Hatley.Models;
using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
	public class OrderDTO
	{	
		public int order_id { get; set; }
		public string description { get; set; }
		public string order_governorate_from { get; set; }
		public string order_zone_from { get; set; }
		public string? order_city_from { get; set; }
		public string? detailes_address_from { get; set; }
		public string? order_governorate_to { get; set; }
		public string? order_zone_to { get; set; }
		public string? order_city_to { get; set; }
		public string? detailes_address_to { get; set; }
		public double? north { get; set; }
		public double? east { get; set; }
		public DateTime? created { get; set; }
		public DateTime order_time { get; set; }
		public double? price { get; set; }
		public int? status { get; set; }
		public int? User_ID { get; set; }
		public int? Delivery_ID { get; set; }

	}
}
