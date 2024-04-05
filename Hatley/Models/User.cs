using Hatley.DTO;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Hatley.Models
{
	public class User
	{
		[Key]
		public int User_ID { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string  Phone { get; set; }
		[Required]
		[EmailAddress]
		public string Email { get; set; }
		[Required]
		public string Password { get; set; }
		public string? Photo { get; set; }
		public ICollection<Order> Orders { get; set; }=new List<Order>();
        public string? ResetTokenForUser { get; set; }


        //public int national_id { get; set; }
        //public string front_National_ID_img { get; set; }
        //public string back_National_ID_img { get; set; }
        //public string face_with_National_ID_img { get; set; }
    }
}
