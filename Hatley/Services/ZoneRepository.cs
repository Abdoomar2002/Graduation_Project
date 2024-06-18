using Hatley.DTO;
using Hatley.Models;
using System;
using System.Globalization;

namespace Hatley.Services
{
    public class ZoneRepository : IZoneRepository
    {
        private readonly appDB context;
        private readonly Zone zone;
        public ZoneRepository(appDB context, Zone zone)
        {
            this.context = context;
            this.zone = zone;
        }
        public List<ZoneDTO>? Displayall()
        {
            List<Zone> zones = context.zones.ToList();
            if(zones.Count == 0)
            {
                return null;
            }
            List<ZoneDTO> zonesDTO = zones.Select(x => new ZoneDTO()
            {
                zone_id = x.Zone_ID,
                name = x.Name,
                north = x.North,
                east = x.East,
                governorate_id = x.Governorate_ID
            }).ToList();
            return zonesDTO;
        }


        public List <ZoneDTO>? DisplayAllZonesToGovernorate (string governorate_name)
        {
            int governorate_id = context.governorates.Where(x => x.Name == governorate_name)
                .Select(x => x.Governorate_ID).FirstOrDefault();
            
			List<Zone> zones = context.zones.Where(x => x.Governorate_ID == governorate_id)
                .ToList();
            if(zones.Count == 0)
            {
                return null;
            }

			List<ZoneDTO> zonesDTO = zones.Select(x => new ZoneDTO()
			{
				zone_id = x.Zone_ID,
				name = x.Name,
				north = x.North,
				east = x.East,
				governorate_id = x.Governorate_ID
			}).ToList();
			return zonesDTO;
		}

		public ZoneDTO? Display(int id)
        {
            var zone = context.zones.FirstOrDefault(x => x.Zone_ID == id);
            if (zone == null)
            {
                return null;
            }
            ZoneDTO zoneDTO = new ZoneDTO()
            {
                zone_id = zone.Zone_ID,
                name = zone.Name,
                north = zone.North,
                east = zone.East,
                governorate_id= zone.Governorate_ID
            };
            return zoneDTO;
        }
        public int Insert(ZoneDTO item)
        {
            var north = context.zones.FirstOrDefault(x => x.North == item.north);
            //var east = context.zones.FirstOrDefault(x => x.East == item.East);
            if (north == null)// && east == null)
            {
                zone.Name = item.name;
                zone.Governorate_ID = item.governorate_id;
                zone.East = item.east;
                zone.North = item.north;
                context.zones.Add(zone);
                context.SaveChanges();
                return 1;
            }
            else if(north != null && north.East != item.east)
            {
                zone.Name = item.name;
                zone.Governorate_ID = item.governorate_id;
                zone.East = item.east;
                zone.North = item.north;
                context.zones.Add(zone);
                context.SaveChanges();
                return 1;
            }
            return 0;
        }
        public int Edit(int id, ZoneDTO item)
        {
            var oldzone = context.zones.FirstOrDefault(x => x.Zone_ID == id);
            var north = context.zones.FirstOrDefault(x => x.North == item.north);
            if (north == null)
            {
                oldzone.Name = item.name;
                oldzone.Governorate_ID = item.governorate_id;
                oldzone.East = item.east;
                oldzone.North = item.north;
                int raw =context.SaveChanges();
                return raw;
            }
            else if (north != null && oldzone.East == item.east && oldzone.Zone_ID == item.zone_id)
            {
                oldzone.Name = item.name;
                oldzone.Governorate_ID = item.governorate_id;
                oldzone.East = item.east;
                oldzone.North = item.north;
                int raw = context.SaveChanges();
                return raw;
            }
            return 0;
        }
        public int Delete(int id)
        {
            var oldZone = context.zones.FirstOrDefault(x => x.Zone_ID == id);
            if (oldZone != null)
            {
                context.zones.Remove(oldZone);
                context.SaveChanges();
                return 0;
            }
            return -1;
        }
    }
}
