using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeckFlow.Api.Migrations
{
    /// <inheritdoc />
    public partial class StudyLogic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "FlashCards",
                type: "INTEGER",
                nullable: false,
                defaultValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "FlashCards");
        }
    }
}
