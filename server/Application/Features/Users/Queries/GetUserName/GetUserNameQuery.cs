using server.Application.Features.Interfaces;

namespace server.Application.Features.Users.Queries.GetUserName
{
    public class GetUserNameQuery : IQueryBase
    {
        public string? Token { get; set; }
    }
}
