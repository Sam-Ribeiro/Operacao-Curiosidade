using Microsoft.IdentityModel.Tokens;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Services.Authentication
{
    public class CreateToken : ICreateToken
    {

        private readonly IConfiguration _configuration;

        public CreateToken(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string NewToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AppSettings:Token")!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("AppSettings:Issuer"),
                    audience: _configuration.GetValue<string>("AppSettings:Audience"),
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(10),
                    signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}

