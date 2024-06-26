namespace Hatley.DTO
{
	public class DeliveriesUserDTO
	{
		public int Order_id { get; set; }
		public string description { get; set; }
		public string order_zone_from { get; set; }
		public string? order_city_from { get; set; }
		public string? detailes_address_from { get; set; }
		public string? order_zone_to { get; set; }
		public string? order_city_to { get; set; }
		public string? detailes_address_to { get; set; }
		public DateTime? created { get; set; }
		public DateTime order_time { get; set; }
		public double? price { get; set; }
		public int? status { get; set; }
		public string delivery_name { get; set; }
		public string? delivery_photo { get; set; }
		public double? delivery_avg_rate { get; set; }
	}
}
