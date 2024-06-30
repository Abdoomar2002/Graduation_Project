namespace Hatley.DTO
{
	public class StatisticsDTO
	{
		public int total_orders { get; set; }
		public int? complete_orders { get; set; }
		public int? incomplete_orders { get; set;}
		public int? pending { get; set;}
		public int? orders_last_30_days { get; set; }
		public double? rate { get; set; }
	}
	
}
