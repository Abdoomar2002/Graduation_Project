namespace Hatley.DTO
{
	public class RelatedOrdersForDeliveryDTO
	{
		public int Id { get; set; }
		public string description { get; set; }
		public string order_governorate_from { get; set; }
		public string order_zone_from { get; set; }
		public string? order_city_from { get; set; }
		public string? order_governorate_to { get; set; }
		public string? order_zone_to { get; set; }
		public string? order_city_to { get; set; }
		public string? detailes_address { get; set; }
		public DateTime? created { get; set; }
		public DateTime order_time { get; set; }
		public double price { get; set; }
		public int? status { get; set; }
		public int? User_ID { get; set; }
		public int? Delivery_ID { get; set; }

		public string user_name { get; set; }
		public string? user_photo { get; set; }
		//public double? user_avg_rate { get; set; }
		//public int? user_count_rate { get; set; }
	}
}
