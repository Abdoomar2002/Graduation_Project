using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class edit6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Order_ID",
                table: "ratings",
                newName: "Id_for_order");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id_for_order",
                table: "ratings",
                newName: "Order_ID");
        }
    }
}
