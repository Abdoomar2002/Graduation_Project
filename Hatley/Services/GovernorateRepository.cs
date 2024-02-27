using Hatley.DTO;
using Hatley.Models;
using System;

namespace Hatley.Services
{
    public class GovernorateRepository : IGovernorateRepository
    {
        private readonly appDB context;
        private readonly Governorate governorate;
        public GovernorateRepository(Governorate governorate,appDB context)
        {
            this.governorate = governorate;
            this.context = context;
        }
        public List<GovernorateDTO>? Displayall()
        {
            List<Governorate> allgovernorates = context.governorates.ToList();
            if (allgovernorates == null)
            {
                return null;
            }
            List<GovernorateDTO> governoratesDTO = allgovernorates.Select(x => new GovernorateDTO()
            {
                Governorate_ID = x.Governorate_ID,
                Name = x.Name
            }).ToList();
            return governoratesDTO;
        }
        public GovernorateDTO? Display(int id)
        {
            var governorate = context.governorates.FirstOrDefault(x => x.Governorate_ID == id);
            if (governorate == null)
            {
                return null;
            }
            GovernorateDTO governorateDTO = new GovernorateDTO()
            {
                Governorate_ID = governorate.Governorate_ID,
                Name = governorate.Name
            };
            return governorateDTO;
        }
        public int Insert(GovernorateDTO newGovernorate)
        {
            var name = context.governorates.FirstOrDefault(x => x.Name == newGovernorate.Name);
            if (name == null)
            {
                governorate.Name = newGovernorate.Name;
                context.governorates.Add(governorate);
                context.SaveChanges();
                return 1;
            }
            return 0;
        }
        public int Edit(int id, GovernorateDTO editGovernorate)
        {
            var oldGovernorate = context.governorates.FirstOrDefault(x=> x.Governorate_ID == id);
            var name = context.governorates.FirstOrDefault(x => x.Name == editGovernorate.Name);
            if (name == null)
            {
                oldGovernorate.Name = editGovernorate.Name;
                int raw = context.SaveChanges();
                return raw;
            }
            else if(name != null && oldGovernorate.Governorate_ID == name.Governorate_ID)
            {
                return -1;
            }
            return 0;
        }
        public int Delete(int id)
        {
            var oldGovernorate = context.governorates.FirstOrDefault(x => x.Governorate_ID == id);
            if (oldGovernorate != null)
            {
                context.governorates.Remove(oldGovernorate);
                context.SaveChanges();
                return 0;
            }
            return -1;
        }
    }
}
