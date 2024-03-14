using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Hatley.Models
{
	public class Delivery
	{
		[Key]
		public int Delivery_ID { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Phone { get; set; }
		[EmailAddress]
		[Required]
		public string Email { get; set; }
		[Required]
		public string Password { get; set; }
		public string? Photo { get; set; }
		[Required]
		[StringLength(14)]
		public string National_id { get; set; }
		[Required]
		public string Front_National_ID_img { get; set; }
		[Required]
		public string Back_National_ID_img { get; set; }
		[Required]
		public string Face_with_National_ID_img { get; set; }
		public double? Rate { get; set; }
		public int? Governorate_ID { get; set; }
		[ForeignKey("Governorate_ID")]
		public virtual Governorate? Governorate { get; set; }
		public int? Zone_ID { get; set; }
		[ForeignKey("Zone_ID")]
		public virtual Zone? Zone { get; set; }
		public ICollection<Comment> Comments { get; set; } = new List<Comment>();

	}
}
