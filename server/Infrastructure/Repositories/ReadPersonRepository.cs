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
            _context.LoadContexts();
        }
        public List<Person>? GetAllPersons()
        {
            _context.LoadContexts();
            return _context.persons.FindAll(person => person.Removed == false);
        }
        
        public List<Person>? GetDeletedPersons()
        {
            _context.LoadContexts();
            return _context.persons.FindAll(person => person.Removed == true);
        }
        public List<string>? GetEmails(string? email)
        {
            _context.LoadContexts();
            return _context.persons.FindAll(person => person.Email != email)
                .Select(person => person.Email).ToList() ?? new List<string>();
        }
        public Person? GetPersonById(int id)
        {
            _context.LoadContexts();
            return _context.persons.FirstOrDefault(person => person.Id.Equals(id));
        }

        public int GetPersonsCount()
        {
            return _context.persons.FindAll(person => person.Removed == false).Count();
        }
        public int GetInactiveCount()
        {
            return _context.persons.FindAll(person => person.Status == false && person.Removed == false).Count();
        }
        public int GetLastMonthRecordCount()
        {
            var now = DateTime.UtcNow;
            var oneMonthAgo = now.AddMonths(-1);

            return _context.persons.Count(person => person.RegistrationDate >= oneMonthAgo);
        }
    }
}
