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
				optionsBuilder.UseSqlServer("Data Source=DESKTOP-46IUSU0\\MSS;Initial Catalog=Hatley;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
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

