using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;

using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();
        return Ok(categories);
    }

    [HttpPost]
    public async Task<IActionResult> AddCategory(CategoryDTO categoryDTO)
    {
        var category = await _categoryService.AddCategoryAsync(categoryDTO);
        return Ok(category);
    }
}