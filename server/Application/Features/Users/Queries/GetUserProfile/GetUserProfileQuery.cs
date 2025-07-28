using server.Application.Features.Interfaces;

namespace server.Application.Features.Users.Queries.GetUserProfile
{
    public class GetUserProfileQuery : IQueryBase
    {
        public string? Token { get; set; }
    }
}
