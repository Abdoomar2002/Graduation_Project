using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hatley.Models
{
	public class Zone
	{
		[Key]
		public int Zone_ID { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public double North { get; set; }
		[Required]
		public double East { get; set; }
		public int? Governorate_ID { get; set; }
		[ForeignKey("Governorate_ID")]
		public virtual Governorate? Governorate { get; set; }

		public ICollection<Delivery> Delivery_Mens { get; set; } = new List<Delivery>();

	}
}
