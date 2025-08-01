using server.Models;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IReadUserRepository
    {
        User? GetUserById(int id);
        User? GetUserByEmail(string email);
        List<string>? GetEmails();
    }
}
