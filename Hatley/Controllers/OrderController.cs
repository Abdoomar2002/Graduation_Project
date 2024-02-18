using Hatley.DTO;
using Hatley.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderDTORepo repo;

		public OrderController(IOrderDTORepo _Repo)
        {
			repo = _Repo;
		}


		[HttpGet]
        public IActionResult getall()
		{
			List<OrderDTO>? ordersdto = repo.GetOrders();
			if (ordersdto == null)
			{
				return BadRequest("No Records exist");
			}
			return Ok(ordersdto);
		}


		[HttpGet("{id:int}")]
		public IActionResult get(int id)
		{
			var order = repo.GetOrder(id);
			if (order == null)
			{
				return NotFound("the order is not exist");
			}
			return Ok(order);
		}


		[HttpPost]
		public IActionResult add(OrderDTO order)
		{
			if(ModelState.IsValid==true)
			{
				int raw = repo.Create(order);

				if(raw == 0)
				{
					return BadRequest("Error occur during save");
				}
				if(raw == -1)
				{
					return BadRequest("must enter id for user");
				}
				if (raw == -2)
				{
					return NotFound("the user not exist");
				}

				return Ok();
			}

			return BadRequest(ModelState);
		}


		[HttpPut("{id:int}")]
		public IActionResult edit(int id , OrderDTO orderdto)
		{
			if(ModelState.IsValid==true)
			{
				int raw = repo.Update(id, orderdto);
				if(raw == -1)
				{
					return NotFound("the order not exist");
				}
				if(raw == 0)
				{
					return BadRequest("Error occur during save");
				}
				return Ok();
			}
			return BadRequest(ModelState);
		}


		[HttpDelete("{id:int}")]
		public IActionResult delete(int id)
		{
			int raw = repo.Delete(id);
			if (raw == -1)
			{
				return NotFound("the order not exist");
			}
			if (raw == 0)
			{
				return BadRequest("Error occur during delete");
			}
			return Ok();
		}
	}
}
