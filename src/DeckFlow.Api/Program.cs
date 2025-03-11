using DeckFlow.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Adiciona CORS permitindo tudo durante o desenvolvimento
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin() // Permite qualquer origem
                .AllowAnyHeader() // Permite qualquer cabeçalho
                .AllowAnyMethod(); // Permite qualquer método (GET, POST, PUT, DELETE, etc.)
        });
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContextFactory<AppDbContext>(options =>
    options.UseSqlite("Data Source=Infrastructure/database.db"));

var app = builder.Build();

// Aplica a política de CORS apenas em ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowAll"); // Usa a política que permite tudo
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.MapGet("/", () => Results.Redirect("/scalar/")).ExcludeFromDescription();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();