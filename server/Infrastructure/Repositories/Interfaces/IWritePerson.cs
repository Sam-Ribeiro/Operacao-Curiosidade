using server.Models;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IWritePerson
    {
        void AddPerson(Person person);
        void UpdatePerson(Person person);
        void DeletePerson(int id);
        void RestorePerson(int id);
    }
}
