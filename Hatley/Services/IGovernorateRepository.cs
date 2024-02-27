using Hatley.DTO;

namespace Hatley.Services
{
    public interface IGovernorateRepository
    {
        List<GovernorateDTO>? Displayall();
        GovernorateDTO? Display(int id);
        int Insert(GovernorateDTO newGovernorate);
        int Edit(int id, GovernorateDTO editGovernorate);
        int Delete(int id);
    }
}
