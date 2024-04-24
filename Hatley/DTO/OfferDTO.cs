namespace Hatley.DTO
{
	public class OfferDTO
	{
		public int order_id { get; set; }
		public string user_name { get; set;}
		public string? user_photo { get; set;}
		public string description { get; set;}
		public string from { get; set;}
		public string to { get; set;}
		public double price { get; set;}
		public double user_avg_rate { get; set;}
		public int user_count_rate { get; set;}
		public string delivery_email { get; set;}
	}
}
