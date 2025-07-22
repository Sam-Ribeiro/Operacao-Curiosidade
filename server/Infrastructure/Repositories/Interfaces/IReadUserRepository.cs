using server.Models;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IReadUserRepository
    {
        User? GetUserById(int id);
        User? GetUserByEmail(string email);
        List<User>? GetAllUsers();
        List<string>? GetEmails();
    }
}
