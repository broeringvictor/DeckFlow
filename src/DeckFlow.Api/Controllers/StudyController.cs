using DeckFlow.Api.Infrastructure;
using DeckFlow.Domain.UseCases.Study;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DeckFlow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudyController : ControllerBase
    {
        private readonly  AppDbContext _context;

        public StudyController( AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retorna uma lista de flashcards com base na categoria e quantidade solicitada,
        /// aplicando a lógica de 40% mais antigos, 40% maior rating e 20% mais novos.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("GetFlashCards")]
        public async Task<IActionResult> GetFlashCards([FromBody] Request request)
        {
            // Consulta base
            var query = _context.FlashCards
                .Where(fc => fc.CategoryId == request.CategoryId);

            // Se preferir, pode garantir que existam flashcards nessa categoria
            var totalCards = await query.CountAsync();
            if (totalCards == 0)
            {
                return NotFound("Não há flashcards nessa categoria.");
            }

            // Cálculo das fatias (40%, 40%, 20%)
            int totalRequested = request.NumberOfCards;
            int portion40 = (int)(totalRequested * 0.4);
            int portion20 = (int)(totalRequested * 0.2);

            // Para evitar problemas de arredondamento e soma que exceda totalRequested
            // podemos garantir que a soma final não ultrapasse a quantidade solicitada
            // Ex: portion40 + portion40 + portion20 = 100% mas dependendo do arredondamento
            // pode ficar menor/maior. Ajuste conforme necessidade.
            int sumPortions = portion40 + portion40 + portion20;
            if (sumPortions < totalRequested)
            {
                // Se sobrar algo, você pode adicionar ao portion40, portion20 ou redistribuir
                portion20 += (totalRequested - sumPortions);
            }

            // 1) 40% dos mais antigos
            var oldest = await query
                .OrderBy(fc => fc.CreateDate)
                .Take(portion40)
                .ToListAsync();

            // 2) 40% dos com maior Rating
            var highestRating = await query
                .OrderByDescending(fc => fc.Rating)
                .Take(portion40)
                .ToListAsync();

            // 3) 20% dos mais novos
            var newest = await query
                .OrderByDescending(fc => fc.CreateDate)
                .Take(portion20)
                .ToListAsync();

            // Combinar e remover duplicados
            var combined = oldest
                .Concat(highestRating)
                .Concat(newest)
                .Distinct()
                .ToList();

            // Caso tenha menos do que o solicitado (ou mesmo mais, mas repetido),
            // você pode embaralhar e tomar a quantidade exata solicitada.
            var random = new Random();
            var finalList = combined
                .OrderBy(x => random.Next()) // Embaralha
                .Take(totalRequested)        // Garante o tamanho final
                .ToList();

            return Ok(finalList);
        }

        /// <summary>
        /// Atualiza o rating do flashcard.
        /// Em caso de erro: Rating += 2
        /// Em caso de acerto: Rating = Rating / 2 (até chegar em 1)
        /// </summary>
        /// <param name="flashCardId"></param>
        /// <param name="correct"></param>
        /// <returns></returns>
        [HttpPost("Answer")]
        public async Task<IActionResult> AnswerFlashCard(long flashCardId, bool correct)
        {
            var flashCard = await _context.FlashCards.FindAsync(flashCardId);
            if (flashCard == null)
            {
                return NotFound("FlashCard não encontrado.");
            }

            if (correct)
            {
                // Diminui pela metade até chegar em 1
                flashCard.Rating = (int)Math.Ceiling(flashCard.Rating / 2.0);
                if (flashCard.Rating < 1)
                {
                    flashCard.Rating = 1;
                }
            }
            else
            {
                // Em caso de erro, aumenta 2
                flashCard.Rating += 2;
            }

            flashCard.LastUpdateDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(flashCard);
        }
    }
}
