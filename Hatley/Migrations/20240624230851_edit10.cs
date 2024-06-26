using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class edit10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ratings_delivers_Delivery_ID",
                table: "ratings");

            migrationBuilder.DropIndex(
                name: "IX_ratings_Delivery_ID",
                table: "ratings");

            migrationBuilder.DropColumn(
                name: "Delivery_ID",
                table: "ratings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Delivery_ID",
                table: "ratings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ratings_Delivery_ID",
                table: "ratings",
                column: "Delivery_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_ratings_delivers_Delivery_ID",
                table: "ratings",
                column: "Delivery_ID",
                principalTable: "delivers",
                principalColumn: "Delivery_ID");
        }
    }
}
