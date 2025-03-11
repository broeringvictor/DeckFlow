using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeckFlow.Api.Migrations
{
    /// <inheritdoc />
    public partial class ApiKeysConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ApiKeyConfiguration",
                table: "ApiKeyConfiguration");

            migrationBuilder.RenameTable(
                name: "ApiKeyConfiguration",
                newName: "ApiKeysConfiguration");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApiKeysConfiguration",
                table: "ApiKeysConfiguration",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ApiKeysConfiguration",
                table: "ApiKeysConfiguration");

            migrationBuilder.RenameTable(
                name: "ApiKeysConfiguration",
                newName: "ApiKeyConfiguration");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApiKeyConfiguration",
                table: "ApiKeyConfiguration",
                column: "Id");
        }
    }
}
