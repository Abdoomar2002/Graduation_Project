
using Hatley.Hubs;
using Hatley.Models;
using Hatley.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SendEmailsWithDotNet5.Services;
using System.Text;
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
				options.UseSqlServer(builder.Configuration.GetConnectionString("connect"));
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
			builder.Services.AddScoped<IRatingDTORepo, RatingDTORepo>();
			builder.Services.AddScoped<Rating>();
			builder.Services.AddScoped<MailReset>();
			builder.Services.AddScoped<IMailingRepo, MailingRepo>();
            builder.Services.AddScoped<IContactMailRepository, ContactMailRepository>();
			builder.Services.AddScoped<IOfferDTORepo, OfferDTORepo>();
			builder.Services.AddScoped<ITrakingDTORepo, TrakingDTORepo>();
            //builder.Services.AddScoped<IPasswordResetService, PasswordResetService>();
            builder.Services.AddScoped<IMailReset, MailReset>();
            builder.Services.AddHttpContextAccessor();
			//builder.Services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));



			builder.Services.AddSignalR();



			builder.Services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options => {
				options.SaveToken = true;
				options.RequireHttpsMetadata = false;
				options.TokenValidationParameters = new TokenValidationParameters()
				{
					ValidateIssuer = true,
					ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
					ValidateAudience = true,
					ValidAudience = builder.Configuration["JWT:ValidAudiance"],
					IssuerSigningKey =
					new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
				};
			});

			//-----------------------------------
			builder.Services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo", Version = "v1" });
			});
			builder.Services.AddSwaggerGen(swagger =>
			{
				//This is to generate the Default UI of Swagger Documentation    
				swagger.SwaggerDoc("v2", new OpenApiInfo
				{
					Version = "v1",
					Title = "ASP.NET 7 Web API",
					Description = " ITI Projrcy"
				});

				// To Enable authorization using Swagger (JWT)    
				swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
				{
					Name = "Authorization",
					Type = SecuritySchemeType.ApiKey,
					Scheme = "Bearer",
					BearerFormat = "JWT",
					In = ParameterLocation.Header,
					Description = "Enter 'Bearer' [space] and then your valid token in the text input below.\r\n\r\nExample: \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\"",
				});
				swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
				{
					{
					new OpenApiSecurityScheme
					{
					Reference = new OpenApiReference
					{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
					}
					},
					new string[] {}
					}
				});
			});


			/*builder.Services.AddCors(
				options =>
				{
					options.AddDefaultPolicy(cong =>
					{
						cong.AllowAnyMethod().
						SetIsOriginAllowed((host) => true)
						.AllowAnyHeader().AllowCredentials();
					});
				});*/

			
			builder.Services.AddCors(corsOptions => {
				corsOptions.AddPolicy("MyPolicy", corsPolicyBuilder =>
				{
					corsPolicyBuilder.AllowAnyMethod()
					.SetIsOriginAllowed((host) => true)
					.AllowAnyHeader().AllowCredentials();
				});
			});

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			//if (app.Environment.IsDevelopment())
			//{
				app.UseSwagger();
				app.UseSwaggerUI();
			//}

			app.UseStaticFiles(); // For the default wwwroot folder

			// Configure the application to serve static files from the "Delivery_imgs" directory
			var deliveryImgsPath = Path.Combine(builder.Environment.WebRootPath, "Delivery_imgs");
			var deliveryImgsOptions = new StaticFileOptions
			{
				FileProvider = new PhysicalFileProvider(deliveryImgsPath),
				RequestPath = "/Delivery_imgs"
			};
			app.UseStaticFiles(deliveryImgsOptions);

			// Configure the application to serve static files from the "User_imgs" directory
			var userImgsPath = Path.Combine(builder.Environment.WebRootPath, "User_imgs");
			var userImgsOptions = new StaticFileOptions
			{
				FileProvider = new PhysicalFileProvider(userImgsPath),
				RequestPath = "/User_imgs"
			};
			app.UseStaticFiles(userImgsOptions);



			app.UseRouting();
			app.UseCors("MyPolicy");
			app.UseAuthentication();//Check JWT token
			app.UseAuthorization();

			app.MapHub<NotifyNewOrderForDeliveryHup>("/NotifyNewOrderForDelivery");
            app.MapHub<NotifyChangeStatusForUserHub>("/NotifyChangeStatusForUser");
            app.MapHub<NotifyOfAcceptionForDeliveryHub>("/NotifyOfAcceptOrDeclineForDeliveryOffer");
			app.MapHub<NotifyNewOfferForUserHub>("/NotifyNewOfferForUser");

            app.MapControllers();

			app.Run();
		}
	}
}