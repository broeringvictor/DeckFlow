using System.ComponentModel.DataAnnotations;

namespace DeckFlow.Domain.Entities;

public class Category
{
    [Required]
    [Key]
    public long Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }

}