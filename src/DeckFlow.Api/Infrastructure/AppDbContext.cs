using System.Reflection;
using DeckFlow.Domain.Entities;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DeckFlow.Api.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<FlashCard> FlashCards { get; set; } = null!;

    public DbSet<ApiKeyConfiguration> ApiKeysConfiguration { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }


}