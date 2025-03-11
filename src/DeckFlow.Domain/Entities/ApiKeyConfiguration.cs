using System.ComponentModel.DataAnnotations;

namespace DeckFlow.Domain.Entities


{
    public class ApiKeyConfiguration
    {
        [Key]
        public int Id { get; set; }

        public string? OpenAiApiKey { get; set; }

        public string? DeepseekApiKey { get; set; }

        [Required]
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

    }
}

public class ApiKeyUpdateDto
{
    [Required]
    public string Provider { get; set; } = string.Empty; //  OpenAI ou Deepseek

    [Required]
    public string ApiKey { get; set; } = string.Empty;
}