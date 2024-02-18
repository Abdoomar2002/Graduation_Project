using System.ComponentModel.DataAnnotations;

namespace Hatley.Models
{
	public class Governorate
	{
		[Key]
		public int Governorate_ID { get; set; }
		[Required]
		public string Name { get; set; }
		public ICollection<Delivery> Delivery_Mens { get; set; }= new List<Delivery>();
		public ICollection<Zone> Zone_Mens { get; set;} = new List<Zone>();
	}
}
