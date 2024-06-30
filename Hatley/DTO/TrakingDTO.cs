namespace Hatley.DTO
{
	public class TrakingDTO
	{
        public int order_id { get; set; }
		public DateTime order_time { get; set; }
		public string zone_from { get; set; }
		public string? city_from { get; set; }
		public string? zone_to { get; set; }
		public string? city_to { get; set;}
		public int? status { get; set;}
		public int? delivery_id { get; set; }
    }
}
