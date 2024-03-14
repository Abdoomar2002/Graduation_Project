using Hatley.DTO;
using Hatley.Models;
using Hatley.Controllers;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Linq;
using System;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.AspNetCore.Mvc;

namespace Hatley.Services
{
	public class DeliveryRepository : IDeliveryRepository
	{
		private readonly appDB context;
		private readonly Delivery deliveryman;
		private readonly IWebHostEnvironment hostingEnvironment;

		public DeliveryRepository(Delivery deliveryman, appDB context, IWebHostEnvironment hostingEnvironment)
		{
			this.deliveryman = deliveryman;
			this.context = context;
			this.hostingEnvironment = hostingEnvironment;

		}

		//###############################################################################
		public List<DeliveryDTO>? Displayall()
		{
			List<Delivery> deliverymen = context.delivers.ToList();
			if (deliverymen == null)
			{
				return null;
			}
			List<DeliveryDTO> deliverymenDto = deliverymen.Select(x => new DeliveryDTO()
			{
				Id = x.Delivery_ID,
				Name = x.Name,
				Email = x.Email,
				Password = x.Password,
				Phone = x.Phone,
				national_id = x.National_id,
				front_National_ID_img = x.Front_National_ID_img,
				back_National_ID_img = x.Back_National_ID_img,
				face_with_National_ID_img = x.Face_with_National_ID_img,
				Governorate_ID = x.Governorate_ID,
				Zone_ID = x.Zone_ID
			}).ToList();
			return deliverymenDto;
		}

		//##############################################################################
		public DeliveryDTO? Display(int id)
		{
			var delivery = context.delivers.FirstOrDefault(x => x.Delivery_ID == id);
			if (delivery == null)
			{
				return null;
			}
			DeliveryDTO deliveryDto = new DeliveryDTO()
			{
				Id = delivery.Delivery_ID,
				Name = delivery.Name,
				Email = delivery.Email,
				Password = delivery.Password,
				Phone = delivery.Phone,
				national_id = delivery.National_id,
				front_National_ID_img = delivery.Front_National_ID_img,
				back_National_ID_img = delivery.Back_National_ID_img,
				face_with_National_ID_img = delivery.Face_with_National_ID_img,
				Governorate_ID = delivery.Governorate_ID,
				Zone_ID = delivery.Zone_ID
			};
			return deliveryDto;
		}

		//###############################################################################
		public async Task<string> Insert([FromForm] DeliveryDTO deliveryDTO,
			IFormFile frontImage, IFormFile backImage, IFormFile faceImage)
		{
			var Email = context.delivers.FirstOrDefault(x => x.Email == deliveryDTO.Email);
			if (Email == null)
			{
				try
				{
					var delivery = new Delivery
					{
						Name = deliveryDTO.Name,
						Phone = deliveryDTO.Phone,
						Email = deliveryDTO.Email,
						Password = deliveryDTO.Password,
						National_id = deliveryDTO.national_id,
						Governorate_ID = deliveryDTO.Governorate_ID,
						Zone_ID = deliveryDTO.Zone_ID
					};

					// Save images to wwwroot folder
					delivery.Front_National_ID_img = await SaveImage(frontImage);
					delivery.Back_National_ID_img = await SaveImage(backImage);
					delivery.Face_with_National_ID_img = await SaveImage(faceImage);

					context.delivers.Add(delivery);
					int r = await context.SaveChangesAsync();
					if (r == 0)
					{
						return "1";
					}
					return "2";
				}
				catch (Exception ex)
				{
					return $"Internal server error: {ex.Message}";
				}
			}

			return "0";
		}

		private async Task<string> SaveImage(IFormFile image)
		{
			if (image == null || image.Length == 0)
			{
				return null;
			}

			var uploadsFolder = Path.Combine(hostingEnvironment.WebRootPath, "Delivery_imgs");
			if (!Directory.Exists(uploadsFolder))
			{
				Directory.CreateDirectory(uploadsFolder);
			}

			var uniqueFileName = $"{Guid.NewGuid().ToString()}_{image.FileName}";
			var filePath = Path.Combine(uploadsFolder, uniqueFileName);

			using (var fileStream = new FileStream(filePath, FileMode.Create))
			{
				await image.CopyToAsync(fileStream);
			}

			return filePath;
		}


		//##################################################################
		public int Edit(int id, DeliveryDTO person)
		{
			var oldData = context.delivers.FirstOrDefault(x => x.Delivery_ID == id);
			var email = context.delivers.FirstOrDefault(x => x.Email == person.Email);
			if (oldData != null)
			{
				if (email == null)
				{
					oldData.Name = person.Name;
					oldData.Email = person.Email;
					oldData.Password = person.Password;
					oldData.Phone = person.Phone;
					oldData.National_id = person.national_id;
					oldData.Back_National_ID_img = person.back_National_ID_img;
					oldData.Front_National_ID_img = person.front_National_ID_img;
					oldData.Face_with_National_ID_img = person.face_with_National_ID_img;
					oldData.Governorate_ID = person.Governorate_ID;
					oldData.Zone_ID = person.Zone_ID;
					int raw = context.SaveChanges();
					return raw;
				}
				else if (email != null && email.Delivery_ID == oldData.Delivery_ID)
				{
					oldData.Name = person.Name;
					oldData.Email = person.Email;
					oldData.Password = person.Password;
					oldData.Phone = person.Phone;
					oldData.National_id = person.national_id;
					oldData.Back_National_ID_img = person.back_National_ID_img;
					oldData.Front_National_ID_img = person.front_National_ID_img;
					oldData.Face_with_National_ID_img = person.face_with_National_ID_img;
					oldData.Governorate_ID = person.Governorate_ID;
					oldData.Zone_ID = person.Zone_ID;
					int raw = context.SaveChanges();
					return raw;
				}
				else
					return -1;
			}
			return 0;
		}

		//#########################################################################
		public int Delete(int id)
		{
			var oldData = context.delivers.FirstOrDefault(x => x.Delivery_ID == id);
			if (oldData != null)
			{
				context.delivers.Remove(oldData);
				context.SaveChanges();
				return 0;
			}
			return -1;
		}

		//################################################################################
		public DeliveryDTO? Check(LoginDTO login)
		{
			var deliveryman = context.delivers.FirstOrDefault(x => x.Email == login.Email);
			if (deliveryman == null)
			{
				return null;
			}
			DeliveryDTO delivery = new DeliveryDTO()
			{
				Id = deliveryman.Delivery_ID,
				Name = deliveryman.Name,
				Email = deliveryman.Email,
				Phone = deliveryman.Phone,
				Password = deliveryman.Password,
				national_id = deliveryman.National_id,
				front_National_ID_img = deliveryman.Front_National_ID_img,
				back_National_ID_img = deliveryman.Back_National_ID_img,
				face_with_National_ID_img = deliveryman.Front_National_ID_img,
				Governorate_ID = deliveryman.Governorate_ID,
				Zone_ID = deliveryman.Zone_ID
			};
			return delivery;
		}
	}
}
