using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllAsync();
        Task<Book?> GetByIdAsync(Guid id );
        Task<Book> CreateAsync(BookDTO bookDto);
        Task<Book?> UpdateAsync(Guid id, BookDTO bookDto);
        Task<bool> DeleteAsync(Guid id);
    }
}