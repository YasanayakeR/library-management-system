using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Book
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(100)]
    public string Title { get; set; }

    [Required]
    [StringLength(100)]
    public string Author { get; set; }

    [StringLength(500)]
    public string? Description { get; set; }
}