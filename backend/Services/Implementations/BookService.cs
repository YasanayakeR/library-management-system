using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class BookService : IBookService
    {
        private readonly ApplicationDbContext _context;
        
        public BookService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all books 
        public async Task<IEnumerable<Book>> GetAllAsync()
        {
            return await _context.Books.ToListAsync();
        }

        //Retrieve a specific book using id
        public async Task<Book?> GetByIdAsync(Guid id)
        {
            return await _context.Books.FindAsync(id);
        }

        // Create a new book record 
        public async Task<Book> CreateAsync(BookDTO bookDto)
        {
            var book = new Book
            {
                Title = bookDto.Title,
                Author = bookDto.Author,
                Description = bookDto.Description
            };
            
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return book;
        }

        // Update an existing book using id
        public async Task<Book?> UpdateAsync(Guid id, BookDTO bookDto)
        {
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
                return null;
            
            existingBook.Title = bookDto.Title;
            existingBook.Author = bookDto.Author;
            existingBook.Description = bookDto.Description;
            
            await _context.SaveChangesAsync();

            return existingBook;
        }

        // Delete a book by id
        public async Task<bool> DeleteAsync(Guid id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
                return false;
            
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}