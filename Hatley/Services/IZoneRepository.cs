using Hatley.DTO;
using Hatley.Models;

namespace Hatley.Services
{
    public interface IZoneRepository
    {
        List<ZoneDTO>? Displayall();
        List<ZoneDTO>? DisplayAllZonesToGovernorate(string governorate_name);
		ZoneDTO? Display(int id);
        int Insert(ZoneDTO item);
        int Edit(int id, ZoneDTO item);
        int Delete(int id);
    }
}
