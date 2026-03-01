using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestModel request)
    {
        var result = await _authService.LoginAsync(request);

        if (result == null)
            return Unauthorized("Invalid username or password");

        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(User user, string password)
    {
        var result = await _authService.RegisterAsync(user, password);
        return Ok(result);
    }
}