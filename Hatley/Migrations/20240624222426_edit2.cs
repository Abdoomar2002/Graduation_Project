using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class edit2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ratings_orders_Order_id",
                table: "ratings");

            migrationBuilder.RenameColumn(
                name: "Order_id",
                table: "ratings",
                newName: "Order_ID");

            migrationBuilder.RenameIndex(
                name: "IX_ratings_Order_id",
                table: "ratings",
                newName: "IX_ratings_Order_ID");

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

            migrationBuilder.RenameColumn(
                name: "Order_ID",
                table: "ratings",
                newName: "Order_id");

            migrationBuilder.RenameIndex(
                name: "IX_ratings_Order_ID",
                table: "ratings",
                newName: "IX_ratings_Order_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ratings_orders_Order_id",
                table: "ratings",
                column: "Order_id",
                principalTable: "orders",
                principalColumn: "Order_ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
