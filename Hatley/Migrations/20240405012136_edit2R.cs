using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hatley.Migrations
{
    /// <inheritdoc />
    public partial class edit2R : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ResetToken",
                table: "users",
                newName: "ResetTokenForUser");

            migrationBuilder.RenameColumn(
                name: "ResetToken",
                table: "delivers",
                newName: "ResetTokenForDelivery");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ResetTokenForUser",
                table: "users",
                newName: "ResetToken");

            migrationBuilder.RenameColumn(
                name: "ResetTokenForDelivery",
                table: "delivers",
                newName: "ResetToken");
        }
    }
}
