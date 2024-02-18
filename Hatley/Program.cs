
using Hatley.Models;
using Hatley.Services;
using Microsoft.EntityFrameworkCore;

namespace Hatley
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddDbContext<appDB>(
			options =>
			{
				options.UseSqlServer(builder.Configuration.GetConnectionString("connet"));
			}
			);

			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();
			builder.Services.AddScoped<IUserDTORepo, UserDTORepo>();
			builder.Services.AddScoped<User>();
			builder.Services.AddScoped<IOrderDTORepo, OrderDTORepo>();
			builder.Services.AddScoped<Order>();
			builder.Services.AddScoped<ICommentRepo, CommentRepo>();
			builder.Services.AddScoped<Comment>();
			builder.Services.AddScoped<IDeliveryRepository, DeliveryRepository>();
			builder.Services.AddScoped<Delivery>();
			builder.Services.AddScoped<IGovernorateRepository, GovernorateRepository>();
			builder.Services.AddScoped<Governorate>();
			builder.Services.AddScoped<IZoneRepository, ZoneRepository>();
			builder.Services.AddScoped<Zone>();
			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}