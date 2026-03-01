using backend.Data;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<LoginResponseModel?> LoginAsync(LoginRequestModel request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user == null)
            return null;

        // Verify password (handling legacy plain text and BCrypt hashes)
        bool isPasswordValid = false;
        try 
        {
            if (user.PasswordHash.StartsWith("$2") && user.PasswordHash.Length > 20)
            {
                isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            }
            else
            {
                // Fallback for legacy plain-text passwords
                isPasswordValid = user.PasswordHash == request.Password;
            }
        }
        catch (BCrypt.Net.SaltParseException)
        {
            // If it fails to parse as a BCrypt hash, try plain text comparison
            isPasswordValid = user.PasswordHash == request.Password;
        }

        if (!isPasswordValid)
            return null;

        var tokenHandler = new JwtSecurityTokenHandler();
        var keyString = _configuration["JwtConfig:Key"] 
                        ?? throw new Exception("JWT Key not configured");

        var key = Encoding.UTF8.GetBytes(keyString);

        var expiryTime = DateTime.UtcNow.AddHours(2);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            }),
            Expires = expiryTime,
            Issuer = _configuration["JwtConfig:Issuer"],
            Audience = _configuration["JwtConfig:Audience"],
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return new LoginResponseModel
        {
            UserName = user.Username,
            AccessToken = tokenHandler.WriteToken(token),
            ExpiresIn = expiryTime
        };
    }

    public async Task<User?> RegisterAsync(User user, string password)
    {
        // Hash the password 
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
        
        // Default role to Admin if not explicitly set
        if (string.IsNullOrEmpty(user.Role) || user.Role == "User")
        {
            user.Role = "Admin";
        }
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        return user;
    }
}