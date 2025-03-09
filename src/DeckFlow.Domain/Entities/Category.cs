using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class Category
{
    [Required]
    [Key]
    public long Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }

}