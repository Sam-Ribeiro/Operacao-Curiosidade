using server.Application.Features.Interfaces;

namespace server.Application.Features.Users.Queries.GetUserProfile
{
    public class GetUserProfileQuery : IQueryBase
    {
        public int Id { get; set; }
        public string Token { get; set; }
    }
}
