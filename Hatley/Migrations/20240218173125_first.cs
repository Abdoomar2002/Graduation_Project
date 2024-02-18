using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class first : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "governorates",
                columns: table => new
                {
                    GovernorateID = table.Column<int>(name: "Governorate_ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_governorates", x => x.GovernorateID);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    UserID = table.Column<int>(name: "User_ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rate = table.Column<double>(type: "float", nullable: true),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "zones",
                columns: table => new
                {
                    ZoneID = table.Column<int>(name: "Zone_ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    North = table.Column<double>(type: "float", nullable: false),
                    East = table.Column<double>(type: "float", nullable: false),
                    GovernorateID = table.Column<int>(name: "Governorate_ID", type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_zones", x => x.ZoneID);
                    table.ForeignKey(
                        name: "FK_zones_governorates_Governorate_ID",
                        column: x => x.GovernorateID,
                        principalTable: "governorates",
                        principalColumn: "Governorate_ID",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "delivers",
                columns: table => new
                {
                    DeliveryID = table.Column<int>(name: "Delivery_ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nationalid = table.Column<int>(name: "National_id", type: "int", nullable: false),
                    FrontNationalIDimg = table.Column<string>(name: "Front_National_ID_img", type: "nvarchar(max)", nullable: false),
                    BackNationalIDimg = table.Column<string>(name: "Back_National_ID_img", type: "nvarchar(max)", nullable: false),
                    FacewithNationalIDimg = table.Column<string>(name: "Face_with_National_ID_img", type: "nvarchar(max)", nullable: false),
                    Rate = table.Column<double>(type: "float", nullable: true),
                    GovernorateID = table.Column<int>(name: "Governorate_ID", type: "int", nullable: true),
                    ZoneID = table.Column<int>(name: "Zone_ID", type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_delivers", x => x.DeliveryID);
                    table.ForeignKey(
                        name: "FK_delivers_governorates_Governorate_ID",
                        column: x => x.GovernorateID,
                        principalTable: "governorates",
                        principalColumn: "Governorate_ID",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_delivers_zones_Zone_ID",
                        column: x => x.ZoneID,
                        principalTable: "zones",
                        principalColumn: "Zone_ID",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "chats",
                columns: table => new
                {
                    ChatID = table.Column<int>(name: "Chat_ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    details = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    UserID = table.Column<int>(name: "User_ID", type: "int", nullable: false),
                    DeliveryID = table.Column<int>(name: "Delivery_ID", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_chats", x => x.ChatID);
                    table.ForeignKey(
                        name: "FK_chats_delivers_Delivery_ID",
                        column: x => x.DeliveryID,
                        principalTable: "delivers",
                        principalColumn: "Delivery_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_chats_users_User_ID",
                        column: x => x.UserID,
                        principalTable: "users",
                        principalColumn: "User_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    CommentID = table.Column<int>(name: "Comment_ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeliveryID = table.Column<int>(name: "Delivery_ID", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comments", x => x.CommentID);
                    table.ForeignKey(
                        name: "FK_comments_delivers_Delivery_ID",
                        column: x => x.DeliveryID,
                        principalTable: "delivers",
                        principalColumn: "Delivery_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    OrderID = table.Column<int>(name: "Order_ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    DeliveryID = table.Column<int>(name: "Delivery_ID", type: "int", nullable: true),
                    UserID = table.Column<int>(name: "User_ID", type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.OrderID);
                    table.ForeignKey(
                        name: "FK_orders_delivers_Delivery_ID",
                        column: x => x.DeliveryID,
                        principalTable: "delivers",
                        principalColumn: "Delivery_ID");
                    table.ForeignKey(
                        name: "FK_orders_users_User_ID",
                        column: x => x.UserID,
                        principalTable: "users",
                        principalColumn: "User_ID",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_chats_Delivery_ID",
                table: "chats",
                column: "Delivery_ID");

            migrationBuilder.CreateIndex(
                name: "IX_chats_User_ID",
                table: "chats",
                column: "User_ID");

            migrationBuilder.CreateIndex(
                name: "IX_comments_Delivery_ID",
                table: "comments",
                column: "Delivery_ID");

            migrationBuilder.CreateIndex(
                name: "IX_delivers_Governorate_ID",
                table: "delivers",
                column: "Governorate_ID");

            migrationBuilder.CreateIndex(
                name: "IX_delivers_Zone_ID",
                table: "delivers",
                column: "Zone_ID");

            migrationBuilder.CreateIndex(
                name: "IX_orders_Delivery_ID",
                table: "orders",
                column: "Delivery_ID");

            migrationBuilder.CreateIndex(
                name: "IX_orders_User_ID",
                table: "orders",
                column: "User_ID");

            migrationBuilder.CreateIndex(
                name: "IX_zones_Governorate_ID",
                table: "zones",
                column: "Governorate_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "chats");

            migrationBuilder.DropTable(
                name: "comments");

            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "delivers");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "zones");

            migrationBuilder.DropTable(
                name: "governorates");
        }
    }
}
