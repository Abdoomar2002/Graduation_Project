namespace Hatley.DTO
{
	public class DeliveriesUserDTO
	{
		public int Id { get; set; }
		public string description { get; set; }
		public string order_zone_from { get; set; }
		public string? order_zone_to { get; set; }
		public DateTime? created { get; set; }
		public DateTime order_time { get; set; }
		public double price { get; set; }
		public int? status { get; set; }
		public string user_name { get; set; }
		public double user_avg_rate { get; set; }
	}
}
