using Hatley.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
    public class DeliveryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public int national_id { get; set; }
        public string front_National_ID_img { get; set; }
        public string back_National_ID_img { get; set; }
        public string face_with_National_ID_img { get; set; }
        public int? Governorate_ID { get; set; }
        public int? Zone_ID { get; set; }

    }
}
