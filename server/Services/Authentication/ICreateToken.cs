using server.Models;

namespace server.Services.Authentication
{
    public interface ICreateToken
    {
        public string Generate(User user);
    }
}
