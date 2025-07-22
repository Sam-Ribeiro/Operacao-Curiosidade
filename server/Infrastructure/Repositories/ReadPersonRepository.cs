using server.Infrastructure.Data;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Infrastructure.Repositories
{
    public class ReadPersonRepository : IReadPerson
    {
        public InMemoryContext _context;
        public ReadPersonRepository(InMemoryContext context)
        {
            _context = context;
        }
        public List<Person>? GetAllPersons()
        {
            return _context.persons;
        }

        public List<string>? GetEmails()
        {
            return _context.persons?.Select(person => person.Email).ToList() ?? new List<string>();
        }

        public Person? GetPersonById(int id)
        {
            return _context.persons?.FirstOrDefault(person => person.Id == id);
        }
    }
}
