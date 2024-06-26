using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class edit8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id_for_order",
                table: "ratings",
                newName: "Order_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ratings_Order_ID",
                table: "ratings",
                column: "Order_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_ratings_orders_Order_ID",
                table: "ratings",
                column: "Order_ID",
                principalTable: "orders",
                principalColumn: "Order_ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ratings_orders_Order_ID",
                table: "ratings");

            migrationBuilder.DropIndex(
                name: "IX_ratings_Order_ID",
                table: "ratings");

            migrationBuilder.RenameColumn(
                name: "Order_ID",
                table: "ratings",
                newName: "Id_for_order");
        }
    }
}
