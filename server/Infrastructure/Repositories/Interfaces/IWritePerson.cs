using server.Models;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IWritePerson
    {
        void AddPerson(Person person, int userId);
        void UpdatePerson(Person person, int userId);
        void DeletePerson(int id, int userId);
        void RestorePerson(int id, int userId);
    }
}
