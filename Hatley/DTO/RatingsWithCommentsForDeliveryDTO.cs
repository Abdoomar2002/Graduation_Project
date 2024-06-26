namespace Hatley.DTO
{
	public class RatingsWithCommentsForDeliveryDTO
	{
		public string user_name { get; set; }
		public string? user_photo { get; set; }
		public string? comment { get; set; }
		public DateTime comment_created_at { get; set; }
		public int? rating { get; set; }
		public int order_id { get; set; }
	}
}
