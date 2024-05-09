namespace Hatley.DTO
{
    public class ZoneDTO
    {
        public int zone_id { get; set; }
        public string name { get; set; }
        public double north { get; set; }
        public double east { get; set; }
        public int? governorate_id { get; set; }
    }
}
