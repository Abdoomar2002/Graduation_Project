using Hatley.DTO;
using Hatley.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class OrderController : ControllerBase
	{
		private readonly IOrderDTORepo repo;
		private readonly string? email;
		private readonly string? type; 
		private readonly IHttpContextAccessor httpContextAccessor;

		public OrderController(IOrderDTORepo _Repo, IHttpContextAccessor _httpContextAccessor)
        {
			repo = _Repo;
			httpContextAccessor = _httpContextAccessor;
			email = httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "Email")?.Value;
			type = httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "type")?.Value;

		}


		[HttpGet]
        public IActionResult getall()
		{
			/*if (type != "Admin")
			{
				return Unauthorized();
			}*/

			List<OrderDTO>? ordersdto = repo.GetOrders();
			if (ordersdto == null)
			{
				return BadRequest("No Records exist");
			}
			return Ok(ordersdto);
		}


		[HttpGet("related/orders")]
		public IActionResult DisplayRelatedOrdersForDelivery()
		{
			if (type != "Delivery")
			{
				return Unauthorized();
			}

			List<RelatedOrdersForDeliveryDTO>? orders = repo.DisplayRelatedOrdersForDelivery(email);
			if (orders == null)
			{
				return BadRequest("Error occur or not exist related orders");
			}
			return Ok(orders);
		}


		[HttpGet("unrelated/orders")]
		public IActionResult DisplayUnRelatedOrdersForDelivery()
		{
			if (type != "Delivery")
			{
				return Unauthorized();
			}

			List<RelatedOrdersForDeliveryDTO>? orders = repo.DisplayUnRelatedOrdersForDelivery(email);
			if (orders == null)
			{
				return BadRequest("Error occur or not exist unrelated orders");
			}
			return Ok(orders);
		}


		[HttpGet("Orders")]
		public IActionResult getallforuserordelivery()
		{
			List<RelatedOrdersForDeliveryDTO>? ordersdtoforuserordelivery = repo.GetOrdersForUserOrDelivery(email, type);
			if (ordersdtoforuserordelivery == null)
			{
				return BadRequest("No Records exist");
			}
			return Ok(ordersdtoforuserordelivery);
		}

		[HttpGet("Deliveries")]
		public IActionResult Deliveries()
		{
			if (type != "User")
			{
				return Unauthorized();
			}

			List<DeliveriesUserDTO>? Deliveries = repo.Deliveries(email);
			if (Deliveries == null)
			{
				return BadRequest("No Records exist");
			}
			return Ok(Deliveries);
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

		[HttpGet("ReOrder/{orderid:int}")]
		public IActionResult ReOrder(int orderid)
		{

			var order = repo.GetOrder(orderid);
			if (order == null)
			{
				return NotFound("the order is not exist");
			}
			return Ok(order);
		}

		[HttpGet("Statistics")]
		public IActionResult Statistics()
		{
			StatisticsDTO? statistics = repo.Statistics(email, type);
			if(statistics == null)
			{
				return BadRequest("No orders exist");
			}
			return Ok(statistics);
		}


		[HttpPost]
		public IActionResult add([FromBody]OrderDTO order)
		{
			if (type != "User")
			{
				return Unauthorized();
			}

			if (ModelState.IsValid==true)
			{
				int raw = repo.Create(order,email);

				if(raw == 0)
				{
					return BadRequest("Error occur during save");
				}

				return Ok();
			}

			return BadRequest(ModelState);
		}


		[HttpPut("{id:int}")]
		public IActionResult edit(int id ,[FromBody] OrderDTO orderdto)
		{
			if (type != "User")
			{
				return Unauthorized();
			}

			if (ModelState.IsValid==true)
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
			if (type != "User")
			{
				return Unauthorized();
			}

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
