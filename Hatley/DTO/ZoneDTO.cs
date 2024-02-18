namespace Hatley.DTO
{
    public class ZoneDTO
    {
        public int Zone_ID { get; set; }
        public string Name { get; set; }
        public double North { get; set; }
        public double East { get; set; }
        public int? Governorate_ID { get; set; }
    }
}
