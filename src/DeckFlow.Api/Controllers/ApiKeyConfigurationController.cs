using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeckFlow.Api.Infrastructure;
using DeckFlow.Domain.Entities;

// DONE: `/api/configurations`


namespace DeckFlow.Api.Controllers
{
    [Route("/api/configurations")]
    [ApiController]
    public class ApiKeyConfigurationController(AppDbContext context) : ControllerBase
    {
        // GET: api/ApiKeyConfiguration
        [HttpGet]
        public async Task<ActionResult<object>> GetConfiguration()
        {
            // Busca a chave OpenAI mais recente, se existir
            var openAiKey = await context.ApiKeysConfiguration
                .Where(x => !string.IsNullOrEmpty(x.OpenAiApiKey))
                .OrderByDescending(x => x.LastUpdated)
                .Select(x => new { x.OpenAiApiKey, x.LastUpdated })
                .FirstOrDefaultAsync();

            // Busca a chave Deepseek mais recente, se existir
            var deepseekKey = await context.ApiKeysConfiguration
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
        public async Task<ActionResult<ApiKeyConfiguration>> PostConfiguration([FromBody] ApiKeyUpdateDto dto)
        {
            if (dto.Provider.ToLower() != "openai" && dto.Provider.ToLower() != "deepseek")
                return BadRequest("O provedor deve ser 'OpenAI' ou 'Deepseek'.");

            var config = await context.ApiKeysConfiguration.FirstOrDefaultAsync();

            if (config == null)
            {
                // Criando novo registro caso não exista
                config = new ApiKeyConfiguration();
                context.ApiKeysConfiguration.Add(config);
            }

            // Atualizando a chave correta
            if (dto.Provider.ToLower() == "openai")
                config.OpenAiApiKey = dto.ApiKey;
            else if (dto.Provider.ToLower() == "deepseek")
                config.DeepseekApiKey = dto.ApiKey;

            config.LastUpdated = DateTime.UtcNow;
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConfiguration), new { id = config.Id }, config);
        }

        // PUT: api/ApiKeyConfiguration
        [HttpPut]
        public async Task<IActionResult> PutConfiguration([FromBody] ApiKeyUpdateDto dto)
        {
            if (dto.Provider.ToLower() != "openai" && dto.Provider.ToLower() != "deepseek")
                return BadRequest("O provedor deve ser 'OpenAI' ou 'Deepseek'.");

            var config = await context.ApiKeysConfiguration.FirstOrDefaultAsync();
            if (config == null)
                return NotFound("Nenhuma configuração de API encontrada.");

            // Atualiza apenas a API desejada
            if (dto.Provider.ToLower() == "openai")
                config.OpenAiApiKey = dto.ApiKey;
            else if (dto.Provider.ToLower() == "deepseek")
                config.DeepseekApiKey = dto.ApiKey;

            config.LastUpdated = DateTime.UtcNow;
            await context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/ApiKeyConfiguration/OpenAI ou api/ApiKeyConfiguration/Deepseek
        [HttpDelete("{provider}")]
        public async Task<IActionResult> DeleteConfiguration(string provider)
        {
            var config = await context.ApiKeysConfiguration.FirstOrDefaultAsync();
            if (config == null)
                return NotFound("Nenhuma configuração de API encontrada.");

            if (provider.ToLower() == "openai")
                config.OpenAiApiKey = null;
            else if (provider.ToLower() == "deepseek")
                config.DeepseekApiKey = null;
            else
                return BadRequest("O provedor deve ser 'OpenAI' ou 'Deepseek'.");

            config.LastUpdated = DateTime.UtcNow;
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
