using backend.Models;

namespace backend.Services.Interfaces;

public interface IAuthService
{
    Task<LoginResponseModel?> LoginAsync(LoginRequestModel request);
    Task<User?> RegisterAsync(User user, string password);
}