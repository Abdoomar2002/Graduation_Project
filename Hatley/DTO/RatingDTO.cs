using Hatley.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hatley.DTO
{
	public class RatingDTO
	{
		public int rating_id { get; set; }
		public int value { get; set; }
		public DateTime createdat { get; set; }
		public string rating_from { get; set; }
		public int? Delivery_ID { get; set; }
		public int? User_ID { get; set; }
	}
}
