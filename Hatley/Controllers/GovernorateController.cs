using Hatley.DTO;
using Hatley.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GovernorateController : ControllerBase
    {
        private readonly IGovernorateRepository governorateRepository;
        public GovernorateController(IGovernorateRepository governorateRepository)
        {
            this.governorateRepository = governorateRepository;
        }
        [HttpGet]
        public IActionResult Displayall()
        {
            List<GovernorateDTO> governorates = governorateRepository.Displayall();
            return Ok(governorates);
        }
        [HttpGet("{id:int}")]
        public IActionResult Display(int id)
        {
            GovernorateDTO governorate = governorateRepository.Display(id);
            if (governorate == null)
            {
                return NotFound("Not Found");
            }
            return Ok(governorate);
        }
        [HttpPost]
        public IActionResult Insert(GovernorateDTO newGovernorate)
        {
            if (ModelState.IsValid == true)
            {
                var raw = governorateRepository.Insert(newGovernorate);
                if (raw == 0)
                {
                    return BadRequest("The governorate already exists");
                }
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpPut("{id:int}")]
        public IActionResult Edit(int id, GovernorateDTO editGovernorate)
        {
            if (ModelState.IsValid == true)
            {
                int raw = governorateRepository.Edit(id, editGovernorate);
                if (raw == 0)
                {
                    return BadRequest("Goverrnorate already exists");
                }
                else if (raw == -1)
                {
                    return BadRequest("Nothing changed");
                }
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            int raw = governorateRepository.Delete(id);
            if (raw == -1)
            {
                return NotFound("That governorate is not found");
            }
            return Ok();
        }
    }
}
