using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class editorder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResetTokenForUser",
                table: "users");

            migrationBuilder.DropColumn(
                name: "ResetTokenForDelivery",
                table: "delivers");

            migrationBuilder.AddColumn<string>(
                name: "Detailes_address",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Order_city_from",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Order_city_to",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Detailes_address",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "Order_city_from",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "Order_city_to",
                table: "orders");

            migrationBuilder.AddColumn<string>(
                name: "ResetTokenForUser",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResetTokenForDelivery",
                table: "delivers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
