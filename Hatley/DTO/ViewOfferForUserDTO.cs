namespace Hatley.DTO
{
	public class ViewOfferForUserDTO
	{
		public string offer_id { get; set; }
		public int order_id { get; set; }
		public string delivery_email { get; set; }
		public string delivery_name { get; set;}
		public string? delivery_photo { get; set;}
		//public int delivery_id { get; set; }
		//public int? userid { get; set; }
		public int offer_value { get; set;}
		public double? delivery_avg_rate { get; set;}
		public int delivery_count_rate { get; set;}
	}
}
