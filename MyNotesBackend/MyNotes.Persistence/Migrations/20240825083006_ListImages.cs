using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyNotes.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ListImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Notes");

            migrationBuilder.AddColumn<string>(
                name: "Images",
                table: "Notes",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Images",
                table: "Notes");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Notes",
                type: "TEXT",
                nullable: true);
        }
    }
}
