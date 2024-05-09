using System.ComponentModel.DataAnnotations;

namespace Hatley.DTO
{
    public class ContactMailDTO
    {
        [Required]
        public string name { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public string message { get; set; }
    }
}
