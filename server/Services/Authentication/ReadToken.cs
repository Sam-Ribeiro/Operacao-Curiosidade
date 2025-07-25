using Microsoft.AspNetCore.DataProtection;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Services.Authentication
{
    public static class ReadToken
    {
        private static string _token;

        public static void Configure(IConfiguration configuration)
        {
            _token = configuration.GetValue<string>("AppSettings:Token")!;
        }
        public static ClaimsPrincipal? ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_token);
            
            try
            {
                token = token.Substring(6).Trim();
                var parameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                };

                var principal = tokenHandler.ValidateToken(token, parameters, out SecurityToken validatedToken);
                return principal;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro validando token: " + ex.Message);
                return null;
            }
        }
    }
}

