using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Hatley.Models
{

	public class appDB : DbContext
	{
		public appDB()
		{
		}
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			if (!optionsBuilder.IsConfigured)
			{
				//optionsBuilder.UseSqlServer("Server=db5078.public.databaseasp.net; Database=db5078; User Id=db5078; Password=xZ%9!k8MF?g2; Encrypt=False; MultipleActiveResultSets=True");
				//optionsBuilder.UseSqlServer("Server=SQL8010.site4now.net;Database=db_aa8903_hatleydata;User Id=db_aa8903_hatleydata_admin;Password=Smarter29.11");
				optionsBuilder.UseSqlServer("Data Source=DESKTOP-46IUSU0;Initial Catalog=Hatley;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
				//optionsBuilder.UseSqlServer("Server=db5073.public.databaseasp.net; Database=db5073; User Id=db5073; Password=5b#H%9MsE_d6; Encrypt=False; MultipleActiveResultSets=True;");

			}
		}

		public appDB(DbContextOptions options) : base(options) { }

		

		public DbSet<Order> orders { get; set; }
		public DbSet<Delivery> delivers { get; set; }
		public DbSet<Chat> chats { get; set; }
		public DbSet<User> users { get; set; }
		public DbSet<Governorate> governorates { get; set; }
		public DbSet<Comment> comments { get; set; }
		public DbSet<Zone> zones { get; set; }
		public DbSet<Rating> ratings { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder
				.Entity<User>()
				.HasMany(x => x.Orders)
				.WithOne(y => y.User)
				.OnDelete(DeleteBehavior.SetNull);

			modelBuilder
				.Entity<Governorate>()
				.HasMany(x => x.Delivery_Mens)
				.WithOne(y => y.Governorate)
				.OnDelete(DeleteBehavior.SetNull);

			modelBuilder
				.Entity<Zone>()
				.HasMany(x => x.Delivery_Mens)
				.WithOne(y => y.Zone)
				.OnDelete(DeleteBehavior.SetNull);

			modelBuilder
				.Entity<Governorate>()
				.HasMany(x => x.Zone_Mens)
				.WithOne(y => y.Governorate)
				.OnDelete(DeleteBehavior.SetNull);
		}
	}
}

