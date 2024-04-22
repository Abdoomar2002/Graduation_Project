namespace Hatley.DTO
{
	public class TrakingDTO
	{
        public int order_id { get; set; }
		public DateTime order_time { get; set; }
		public string from { get; set; }
		public string to { get; set;}
		public int? status { get; set;}
    }
}
