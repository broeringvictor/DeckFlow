using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeckFlow.Api.Infrastructure;
using DeckFlow.Domain.Entities;


namespace DeckFlow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiKeyConfigurationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApiKeyConfigurationController(AppDbContext context)
        {
            _context = context;
        }

// GET: api/ApiKeyConfiguration
        [HttpGet]
        public async Task<ActionResult<object>> GetApiKeyConfiguration()
        {
            // Busca a chave OpenAI mais recente, se existir
            var openAiKey = await _context.ApiKeyConfiguration
                .Where(x => !string.IsNullOrEmpty(x.OpenAiApiKey))
                .OrderByDescending(x => x.LastUpdated)
                .Select(x => new { x.OpenAiApiKey, x.LastUpdated })
                .FirstOrDefaultAsync();

            // Busca a chave Deepseek mais recente, se existir
            var deepseekKey = await _context.ApiKeyConfiguration
                .Where(x => !string.IsNullOrEmpty(x.DeepseekApiKey))
                .OrderByDescending(x => x.LastUpdated)
                .Select(x => new { x.DeepseekApiKey, x.LastUpdated })
                .FirstOrDefaultAsync();

            // Se nenhuma chave for encontrada, retorna erro
            if (openAiKey == null && deepseekKey == null)
            {
                return NotFound("Nenhuma chave API encontrada.");
            }

            // Retorna um objeto contendo apenas as chaves encontradas
            return Ok(new
            {
                OpenAiApiKey = openAiKey?.OpenAiApiKey,
                OpenAiLastUpdated = openAiKey?.LastUpdated,
                DeepseekApiKey = deepseekKey?.DeepseekApiKey,
                DeepseekLastUpdated = deepseekKey?.LastUpdated
            });
        }

        // POST: api/ApiKeyConfiguration
        [HttpPost]
        public async Task<ActionResult<ApiKeyConfiguration>> PostApiKeyConfiguration([FromBody] ApiKeyUpdateDto dto)
        {
            if (dto.Provider.ToLower() != "openai" && dto.Provider.ToLower() != "deepseek")
                return BadRequest("O provedor deve ser 'OpenAI' ou 'Deepseek'.");

            var config = await _context.ApiKeyConfiguration.FirstOrDefaultAsync();

            if (config == null)
            {
                // Criando novo registro caso não exista
                config = new ApiKeyConfiguration();
                _context.ApiKeyConfiguration.Add(config);
            }

            // Atualizando a chave correta
            if (dto.Provider.ToLower() == "openai")
                config.OpenAiApiKey = dto.ApiKey;
            else if (dto.Provider.ToLower() == "deepseek")
                config.DeepseekApiKey = dto.ApiKey;

            config.LastUpdated = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetApiKeyConfiguration), new { id = config.Id }, config);
        }

        // PUT: api/ApiKeyConfiguration
        [HttpPut]
        public async Task<IActionResult> PutApiKeyConfiguration([FromBody] ApiKeyUpdateDto dto)
        {
            if (dto.Provider.ToLower() != "openai" && dto.Provider.ToLower() != "deepseek")
                return BadRequest("O provedor deve ser 'OpenAI' ou 'Deepseek'.");

            var config = await _context.ApiKeyConfiguration.FirstOrDefaultAsync();
            if (config == null)
                return NotFound("Nenhuma configuração de API encontrada.");

            // Atualiza apenas a API desejada
            if (dto.Provider.ToLower() == "openai")
                config.OpenAiApiKey = dto.ApiKey;
            else if (dto.Provider.ToLower() == "deepseek")
                config.DeepseekApiKey = dto.ApiKey;

            config.LastUpdated = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/ApiKeyConfiguration/OpenAI ou api/ApiKeyConfiguration/Deepseek
        [HttpDelete("{provider}")]
        public async Task<IActionResult> DeleteApiKeyConfiguration(string provider)
        {
            var config = await _context.ApiKeyConfiguration.FirstOrDefaultAsync();
            if (config == null)
                return NotFound("Nenhuma configuração de API encontrada.");

            if (provider.ToLower() == "openai")
                config.OpenAiApiKey = null;
            else if (provider.ToLower() == "deepseek")
                config.DeepseekApiKey = null;
            else
                return BadRequest("O provedor deve ser 'OpenAI' ou 'Deepseek'.");

            config.LastUpdated = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
