using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class edit7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ratings_delivers_Delivery_ID1",
                table: "ratings");

            migrationBuilder.DropIndex(
                name: "IX_ratings_Delivery_ID1",
                table: "ratings");

            migrationBuilder.RenameColumn(
                name: "User_ID",
                table: "ratings",
                newName: "Id_for_user");

            migrationBuilder.RenameColumn(
                name: "Delivery_ID1",
                table: "ratings",
                newName: "Id_for_delivery");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ratings_delivers_Delivery_ID",
                table: "ratings");

            migrationBuilder.DropIndex(
                name: "IX_ratings_Delivery_ID",
                table: "ratings");

            migrationBuilder.RenameColumn(
                name: "Id_for_user",
                table: "ratings",
                newName: "User_ID");

            migrationBuilder.RenameColumn(
                name: "Id_for_delivery",
                table: "ratings",
                newName: "Delivery_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_ratings_Delivery_ID1",
                table: "ratings",
                column: "Delivery_ID1");

            migrationBuilder.AddForeignKey(
                name: "FK_ratings_delivers_Delivery_ID1",
                table: "ratings",
                column: "Delivery_ID1",
                principalTable: "delivers",
                principalColumn: "Delivery_ID");
        }
    }
}
