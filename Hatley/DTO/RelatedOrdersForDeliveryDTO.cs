namespace Hatley.DTO
{
	public class RelatedOrdersForDeliveryDTO
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
		public DateTime? created { get; set; }
		public DateTime order_time { get; set; }
		public double? price { get; set; }
		public int? status { get; set; }
		public int? User_ID { get; set; }
		public int? Delivery_ID { get; set; }

		public string? name { get; set; }
		public string? photo { get; set; }
		public int? orders_count { get; set; }
		//public double user_orders_avg { get; set; }
		public double? avg_rate { get; set; }
		public int? count_rate { get; set; }
	}
}
