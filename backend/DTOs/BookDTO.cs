using backend.Models;

namespace backend.DTOs;

public class BookDTO
{
    public string Title { get; set; }
    public string Author { get; set; }
    public string? Description { get; set; }
    public Guid CategoryId { get; set; }
}