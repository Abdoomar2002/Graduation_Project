using Hatley.DTO;
using Hatley.Models;
using Hatley.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly IDeliveryRepository deliveryRepository;
        public DeliveryController(IDeliveryRepository deliveryRepository)
        {
            this.deliveryRepository = deliveryRepository;
        }
        [HttpGet]
        public IActionResult Displayall()
        {
            List<DeliveryDTO> deliveryMen = deliveryRepository.Displayall();
            return Ok(deliveryMen);
        }
        [HttpGet("{id:int}")]
        public IActionResult Display(int id)
        {
            DeliveryDTO deliveryMan = deliveryRepository.Display(id);
            if(deliveryMan == null)
            {
                return NotFound("Not Found");
            }
            return Ok(deliveryMan);
        }
        [HttpPost]
        public IActionResult Insert(DeliveryDTO person)
        {
            if(ModelState.IsValid == true)
            {
                var raw = deliveryRepository.Insert(person);
                if (raw == 0)
                {
                    return BadRequest("The email already exists");
                }
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpPut("{id:int}")]
        public IActionResult Edit(int id, DeliveryDTO person)
        {
            if (ModelState.IsValid == true)
            {
                int raw = deliveryRepository.Edit(id, person);
                if (raw == 0)
                {
                    return NotFound("There is not delivery");
                }
                else if (raw == -1)
                {
                    return BadRequest("The email already exists");
                }
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            int raw = deliveryRepository.Delete(id);
            if (raw == -1)
            {
                return NotFound("There is not delivery");
            }
            return Ok();
        }
    }
}
