using DeckFlow.Api.Infrastructure;
using DeckFlow.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DeckFlow.Api.Controllers
{
    /// <summary>
    /// Controller para gerenciamento de categorias.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obtém todas as categorias.
        /// </summary>
        /// <returns>Lista de categorias.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Category>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }

        /// <summary>
        /// Obtém uma categoria pelo identificador.
        /// </summary>
        /// <param name="id">Identificador da categoria.</param>
        /// <returns>A categoria encontrada ou 404 se não existir.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Category), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Category>> GetCategory(long id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        /// <summary>
        /// Atualiza uma categoria existente.
        /// </summary>
        /// <param name="id">Identificador da categoria.</param>
        /// <param name="category">Objeto com os dados atualizados.</param>
        /// <returns>Nenhum conteúdo em caso de sucesso, 400 ou 404 em caso de erro.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutCategory(long id, Category category)
        {
            if (id != category.Id)
                return BadRequest("O ID da URL não corresponde ao ID do corpo da requisição.");

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CategoryExistsAsync(id))
                    return NotFound("Categoria não encontrada.");
                else
                    throw;
            }

            return NoContent();
        }

        /// <summary>
        /// Cria uma nova categoria.
        /// </summary>
        /// <param name="category">Objeto da categoria a ser criado.</param>
        /// <returns>A categoria criada com o status 201.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(Category), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        /// <summary>
        /// Exclui uma categoria.
        /// </summary>
        /// <param name="id">Identificador da categoria.</param>
        /// <returns>Nenhum conteúdo se a exclusão for realizada, ou 404 se não encontrar a categoria.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCategory(long id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound("Categoria não encontrada.");

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Verifica se uma categoria existe.
        /// </summary>
        /// <param name="id">Identificador da categoria.</param>
        /// <returns>True se a categoria existir, caso contrário false.</returns>
        private async Task<bool> CategoryExistsAsync(long id)
        {
            return await _context.Categories.AnyAsync(e => e.Id == id);
        }
    }
}
