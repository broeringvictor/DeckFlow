using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace DeckFlow.Domain.Entities;

public class FlashCard
{
    [Key] public long Id { get; set; }

    [Required] public string Question { get; set; } = string.Empty;

    [Required] public string Answer { get; set; } = string.Empty;

    public string IncorrectAnswerA { get; set; } = string.Empty;
    public string IncorrectAnswerB { get; set; } = string.Empty;
    public string IncorrectAnswerC { get; set; } = string.Empty;
    public string IncorrectAnswerD { get; set; } = string.Empty;

    public string? CardImage { get; set; }

    public DateTime CreateDate { get; set; } = DateTime.Now;
    public DateTime LastUpdateDate { get; set; } = DateTime.Now;


    public long CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}

public class FlashCardCreateDto
{
    [Required]
    public string Question { get; set; } = string.Empty;

    [Required]
    public string Answer { get; set; } = string.Empty;

    public string IncorrectAnswerA { get; set; } = string.Empty;
    public string IncorrectAnswerB { get; set; } = string.Empty;
    public string IncorrectAnswerC { get; set; } = string.Empty;
    public string IncorrectAnswerD { get; set; } = string.Empty;

    public string? CardImage { get; set; }

    [Required]
    public long CategoryId { get; set; }
}


public class FlashCardUpdateDto
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public string Question { get; set; } = string.Empty;

        [Required]
        public string Answer { get; set; } = string.Empty;

        public string IncorrectAnswerA { get; set; } = string.Empty;
        public string IncorrectAnswerB { get; set; } = string.Empty;
        public string IncorrectAnswerC { get; set; } = string.Empty;
        public string IncorrectAnswerD { get; set; } = string.Empty;

        public string? CardImage { get; set; }

        [Required]
        public long CategoryId { get; set; }
    }

