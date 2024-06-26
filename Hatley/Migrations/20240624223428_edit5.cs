using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class edit5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ratings_orders_Order_ID",
                table: "ratings");

            migrationBuilder.DropIndex(
                name: "IX_ratings_Order_ID",
                table: "ratings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ratings_Order_ID",
                table: "ratings",
                column: "Order_ID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ratings_orders_Order_ID",
                table: "ratings",
                column: "Order_ID",
                principalTable: "orders",
                principalColumn: "Order_ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
