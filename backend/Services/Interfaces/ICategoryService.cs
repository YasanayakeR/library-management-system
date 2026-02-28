using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> AddCategoryAsync(CategoryDTO categoryDto);
    }
    
}

