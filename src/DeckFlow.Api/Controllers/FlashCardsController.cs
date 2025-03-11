using DeckFlow.Api.Infrastructure;
using DeckFlow.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DeckFlow.Api.Controllers
{
    /// <summary>
    /// Controller para gerenciamento de flashcards.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class FlashCardsController(AppDbContext context) : ControllerBase
    {

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<FlashCard>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<FlashCard>>> GetFlashCards()
        {
            var flashCards = await context.FlashCards.ToListAsync();
            return Ok(flashCards);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(FlashCard), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FlashCard>> GetFlashCard(long id)
        {
            var flashCard = await context.FlashCards.FindAsync(id);
            if (flashCard == null)
                return NotFound("FlashCard não encontrado.");

            return Ok(flashCard);
        }

[HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutFlashCard(long id, FlashCardUpdateDto flashCardDto)
        {
            if (id != flashCardDto.Id)
            {
                return BadRequest("O ID da URL não corresponde ao ID do corpo da requisição.");
            }

            // Verifica se a categoria informada existe
            var categoryExists = await context.Categories.AnyAsync(c => c.Id == flashCardDto.CategoryId);
            if (!categoryExists)
            {
                return BadRequest("Categoria informada não existe.");
            }

            // Busca o flashcard existente no banco de dados
            var existingFlashCard = await context.FlashCards.FindAsync(id);
            if (existingFlashCard == null)
            {
                return NotFound("FlashCard não encontrado.");
            }

            // Atualiza os campos permitidos
            existingFlashCard.Question = flashCardDto.Question;
            existingFlashCard.Answer = flashCardDto.Answer;
            existingFlashCard.IncorrectAnswerA = flashCardDto.IncorrectAnswerA;
            existingFlashCard.IncorrectAnswerB = flashCardDto.IncorrectAnswerB;
            existingFlashCard.IncorrectAnswerC = flashCardDto.IncorrectAnswerC;
            existingFlashCard.IncorrectAnswerD = flashCardDto.IncorrectAnswerD;
            existingFlashCard.CardImage = flashCardDto.CardImage;
            existingFlashCard.CategoryId = flashCardDto.CategoryId;
            existingFlashCard.LastUpdateDate = DateTime.Now;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await FlashCardExistsAsync(id))
                {
                    return NotFound("FlashCard não encontrado.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        [ProducesResponseType(typeof(FlashCard), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<FlashCard>> PostFlashCard(FlashCardCreateDto flashCardDto)
        {
            var categoryExists = await context.Categories.AnyAsync(c => c.Id == flashCardDto.CategoryId);
            if (!categoryExists)
            {
                return BadRequest("Categoria informada não existe.");
            }

            var flashCard = new FlashCard
            {
                Question = flashCardDto.Question,
                Answer = flashCardDto.Answer,
                CategoryId = flashCardDto.CategoryId,
                IncorrectAnswerA = string.Empty,
                IncorrectAnswerB = string.Empty,
                IncorrectAnswerC = string.Empty,
                IncorrectAnswerD = string.Empty,
                CreateDate = DateTime.Now,
                LastUpdateDate = DateTime.Now
            };

            context.FlashCards.Add(flashCard);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFlashCard), new { id = flashCard.Id }, flashCard);
        }

        /// <summary>
        /// Exclui um flashcard.
        /// </summary>
        /// <param name="id">Identificador do flashcard.</param>
        /// <returns>Nenhum conteúdo se a exclusão for realizada, ou 404 se o flashcard não for encontrado.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteFlashCard(long id)
        {
            var flashCard = await context.FlashCards.FindAsync(id);
            if (flashCard == null)
                return NotFound("FlashCard não encontrado.");

            context.FlashCards.Remove(flashCard);
            await context.SaveChangesAsync();

            return NoContent();
        }

       private async Task<bool> FlashCardExistsAsync(long id)
        {
            return await context.FlashCards.AnyAsync(e => e.Id == id);
        }
    }
}
