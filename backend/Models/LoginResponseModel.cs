namespace backend.Models;

public class LoginResponseModel
{
    public string UserName { get; set; } = string.Empty;

    public string AccessToken { get; set; } = string.Empty;

    public DateTime ExpiresIn { get; set; }
}