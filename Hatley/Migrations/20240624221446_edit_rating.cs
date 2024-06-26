using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class editrating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ratings_delivers_Delivery_ID",
                table: "ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_ratings_users_User_ID",
                table: "ratings");

            migrationBuilder.DropIndex(
                name: "IX_ratings_Delivery_ID",
                table: "ratings");

            migrationBuilder.DropIndex(
                name: "IX_ratings_User_ID",
                table: "ratings");

            migrationBuilder.RenameColumn(
                name: "Rating_from",
                table: "ratings",
                newName: "Name_to");

            migrationBuilder.AddColumn<int>(
                name: "Delivery_ID1",
                table: "ratings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name_from",
                table: "ratings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Order_id",
                table: "ratings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ratings_Delivery_ID1",
                table: "ratings",
                column: "Delivery_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_ratings_Order_id",
                table: "ratings",
                column: "Order_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ratings_delivers_Delivery_ID1",
                table: "ratings",
                column: "Delivery_ID1",
                principalTable: "delivers",
                principalColumn: "Delivery_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_ratings_orders_Order_id",
                table: "ratings",
                column: "Order_id",
                principalTable: "orders",
                principalColumn: "Order_ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ratings_delivers_Delivery_ID1",
                table: "ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_ratings_orders_Order_id",
                table: "ratings");

            migrationBuilder.DropIndex(
                name: "IX_ratings_Delivery_ID1",
                table: "ratings");

            migrationBuilder.DropIndex(
                name: "IX_ratings_Order_id",
                table: "ratings");

            migrationBuilder.DropColumn(
                name: "Delivery_ID1",
                table: "ratings");

            migrationBuilder.DropColumn(
                name: "Name_from",
                table: "ratings");

            migrationBuilder.DropColumn(
                name: "Order_id",
                table: "ratings");

            migrationBuilder.RenameColumn(
                name: "Name_to",
                table: "ratings",
                newName: "Rating_from");

            migrationBuilder.CreateIndex(
                name: "IX_ratings_Delivery_ID",
                table: "ratings",
                column: "Delivery_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ratings_User_ID",
                table: "ratings",
                column: "User_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_ratings_delivers_Delivery_ID",
                table: "ratings",
                column: "Delivery_ID",
                principalTable: "delivers",
                principalColumn: "Delivery_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_ratings_users_User_ID",
                table: "ratings",
                column: "User_ID",
                principalTable: "users",
                principalColumn: "User_ID");
        }
    }
}
