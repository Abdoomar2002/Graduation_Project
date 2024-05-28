using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class editorderfrom : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Detailes_address",
                table: "orders",
                newName: "Detailes_address_to");

            migrationBuilder.AddColumn<string>(
                name: "Detailes_address_from",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Detailes_address_from",
                table: "orders");

            migrationBuilder.RenameColumn(
                name: "Detailes_address_to",
                table: "orders",
                newName: "Detailes_address");
        }
    }
}
