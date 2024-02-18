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
        public List<ZoneDTO> Displayall()
        {
            List<Zone> zones = context.zones.ToList();
            if(zones.Count == 0)
            {
                return null;
            }
            List<ZoneDTO> zonesDTO = zones.Select(x => new ZoneDTO()
            {
                Zone_ID = x.Zone_ID,
                Name = x.Name,
                North = x.North,
                East = x.East,
                Governorate_ID = x.Governorate_ID
            }).ToList();
            return zonesDTO;
        }
        public ZoneDTO Display(int id)
        {
            var zone = context.zones.FirstOrDefault(x => x.Zone_ID == id);
            if (zone == null)
            {
                return null;
            }
            ZoneDTO zoneDTO = new ZoneDTO()
            {
                Zone_ID = zone.Zone_ID,
                Name = zone.Name,
                North = zone.North,
                East = zone.East,
                Governorate_ID= zone.Governorate_ID
            };
            return zoneDTO;
        }
        public int Insert(ZoneDTO item)
        {
            var north = context.zones.FirstOrDefault(x => x.North == item.North);
            //var east = context.zones.FirstOrDefault(x => x.East == item.East);
            if (north == null)// && east == null)
            {
                zone.Name = item.Name;
                zone.Governorate_ID = item.Governorate_ID;
                zone.East = item.East;
                zone.North = item.North;
                context.zones.Add(zone);
                context.SaveChanges();
                return 1;
            }
            else if(north != null && north.East != item.East)
            {
                zone.Name = item.Name;
                zone.Governorate_ID = item.Governorate_ID;
                zone.East = item.East;
                zone.North = item.North;
                context.zones.Add(zone);
                context.SaveChanges();
                return 1;
            }
            return 0;
        }
        public int Edit(int id, ZoneDTO item)
        {
            var oldzone = context.zones.FirstOrDefault(x => x.Zone_ID == id);
            var north = context.zones.FirstOrDefault(x => x.North == item.North);
            if (north == null)
            {
                oldzone.Name = item.Name;
                oldzone.Governorate_ID = item.Governorate_ID;
                oldzone.East = item.East;
                oldzone.North = item.North;
                int raw =context.SaveChanges();
                return raw;
            }
            else if (north != null && oldzone.East == item.East && oldzone.Zone_ID == item.Zone_ID)
            {
                oldzone.Name = item.Name;
                oldzone.Governorate_ID = item.Governorate_ID;
                oldzone.East = item.East;
                oldzone.North = item.North;
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
