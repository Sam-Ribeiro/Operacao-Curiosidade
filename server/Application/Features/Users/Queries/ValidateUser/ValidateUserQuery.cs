using server.Application.Features.Interfaces;

namespace server.Application.Features.Users.Queries.ValidateUser
{
    public class ValidateUserQuery : IQueryBase
    {
        public string? Token { get; set; }
    }
}
