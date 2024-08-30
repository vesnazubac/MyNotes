using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyNotes.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addmigrationImagesMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Notes",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Notes");
        }
    }
}
