using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class edit3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ratings_Order_ID",
                table: "ratings");

            migrationBuilder.CreateIndex(
                name: "IX_ratings_Order_ID",
                table: "ratings",
                column: "Order_ID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ratings_Order_ID",
                table: "ratings");

            migrationBuilder.CreateIndex(
                name: "IX_ratings_Order_ID",
                table: "ratings",
                column: "Order_ID");
        }
    }
}
