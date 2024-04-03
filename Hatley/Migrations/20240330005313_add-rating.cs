using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class addrating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "rate",
                table: "users");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "delivers");

            migrationBuilder.RenameColumn(
                name: "phone",
                table: "users",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "location",
                table: "orders",
                newName: "Location");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "orders",
                newName: "Description");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "East",
                table: "orders",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "North",
                table: "orders",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Order_Governorate",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Order_Zone",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Order_time",
                table: "orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Comment_from",
                table: "comments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "ratings",
                columns: table => new
                {
                    RatingID = table.Column<int>(name: "Rating_ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Ratingfrom = table.Column<string>(name: "Rating_from", type: "nvarchar(max)", nullable: false),
                    DeliveryID = table.Column<int>(name: "Delivery_ID", type: "int", nullable: true),
                    UserID = table.Column<int>(name: "User_ID", type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ratings", x => x.RatingID);
                    table.ForeignKey(
                        name: "FK_ratings_delivers_Delivery_ID",
                        column: x => x.DeliveryID,
                        principalTable: "delivers",
                        principalColumn: "Delivery_ID");
                    table.ForeignKey(
                        name: "FK_ratings_users_User_ID",
                        column: x => x.UserID,
                        principalTable: "users",
                        principalColumn: "User_ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ratings_Delivery_ID",
                table: "ratings",
                column: "Delivery_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ratings_User_ID",
                table: "ratings",
                column: "User_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ratings");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "East",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "North",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "Order_Governorate",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "Order_Zone",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "Order_time",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "Comment_from",
                table: "comments");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "users",
                newName: "phone");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "orders",
                newName: "location");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "orders",
                newName: "description");

            migrationBuilder.AddColumn<double>(
                name: "rate",
                table: "users",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Rate",
                table: "delivers",
                type: "float",
                nullable: true);
        }
    }
}
