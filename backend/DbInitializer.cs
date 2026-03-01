using backend.Data;
using backend.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace backend;

public static class DbInitializer
{
    public static void Seed(ApplicationDbContext context)
    {
        // Creates ALL tables (Users, Books, Categories)
        context.Database.Migrate();

        // Seed Admin
        if (!context.Users.Any(u => u.Username == "admin"))
        {
            var admin = new User
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                Role = "Admin"
            };

            context.Users.Add(admin);
            context.SaveChanges();
        }

        // Seed Default Categories
        if (!context.Categories.Any())
        {
            context.Categories.AddRange(
                new Category { Name = "Fiction" },
                new Category { Name = "Non - Fiction" },
                new Category { Name = "Academic" },
                new Category { Name = "Children" },
                new Category { Name = "Comics" },
                new Category { Name = "Other" }
            );

            context.SaveChanges();
        }
    }
}