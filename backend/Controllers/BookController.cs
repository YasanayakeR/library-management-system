using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;

using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;
        
        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // Retrieve all books
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _bookService.GetAllAsync();
            return Ok(books);
        }

        // Retrieve a specific book using id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(Guid id)
        {
            var book = await _bookService.GetByIdAsync(id);

            if (book == null)
                return NotFound("Book not found");

            return Ok(book);
        }

        // Create a new book record
        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] BookDTO bookDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdBook = await _bookService.CreateAsync(bookDto);
            
            return CreatedAtAction(nameof(GetBook),
                new { id = createdBook.Id }, createdBook);
        }

        // Update an existing book using id
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(Guid id, [FromBody] BookDTO bookDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedBook = await _bookService.UpdateAsync(id, bookDto);

            if (updatedBook == null)
                return NotFound("Book not found");

            return Ok(updatedBook);
        }

        // Delete a book using id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            var deleted = await _bookService.DeleteAsync(id);

            if (!deleted)
                return NotFound("Book not found");

            return NoContent();
        }
    }
}