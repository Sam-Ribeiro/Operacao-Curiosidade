using server.Models;
namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IWriteUserRepository
    {
        void AddUser(User user);
        void UpdateUser(User user);
        void DeleteUser(int id);

    }
}
