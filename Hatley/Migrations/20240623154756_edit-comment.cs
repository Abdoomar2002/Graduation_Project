using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class editcomment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_comments_delivers_Delivery_ID",
                table: "comments");

            migrationBuilder.DropColumn(
                name: "Comment_from",
                table: "comments");

            migrationBuilder.AlterColumn<int>(
                name: "Delivery_ID",
                table: "comments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Order_id",
                table: "comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_comments_delivers_Delivery_ID",
                table: "comments",
                column: "Delivery_ID",
                principalTable: "delivers",
                principalColumn: "Delivery_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_comments_delivers_Delivery_ID",
                table: "comments");

            migrationBuilder.DropColumn(
                name: "Order_id",
                table: "comments");

            migrationBuilder.AlterColumn<int>(
                name: "Delivery_ID",
                table: "comments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Comment_from",
                table: "comments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_comments_delivers_Delivery_ID",
                table: "comments",
                column: "Delivery_ID",
                principalTable: "delivers",
                principalColumn: "Delivery_ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
