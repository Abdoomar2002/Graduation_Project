using Hatley.DTO;
using Hatley.Models;

namespace Hatley.Services
{
    public interface IDeliveryRepository
    {
        List<DeliveryDTO> Displayall();
        DeliveryDTO Display(int id);
        int Insert(DeliveryDTO person);
        int Edit(int id, DeliveryDTO person);
        int Delete(int id);
        DeliveryDTO? Check(LoginDTO login);
    }
}
