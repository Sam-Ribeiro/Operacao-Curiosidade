using server.Models;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IReadPerson
    {
        Person? GetPersonById(int id);
        List<Person>? GetAllPersons();
        List<Person>? GetDeletedPersons();
        List<string>? GetEmails(string? email);
    }
}
