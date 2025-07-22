using server.Infrastructure.Data;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Infrastructure.Repositories
{
    public class WritePersonRepository : IWritePerson
    {
        public InMemoryContext _context;
        public WritePersonRepository(InMemoryContext context)
        {
            _context = context;
        }
        public void AddPerson(Person person)
        {
            List<Person> persons = _context.persons;
            person.Id = persons.Any() ? persons.Max(p => p.Id) + 1 : 1;
            _context.persons.Add(person);
        }

        public void DeletePerson(int id)
        {
            _context.persons.FirstOrDefault(person => person.Id == id).Removed = true;
        }

        public void RestorePerson(int id)
        {
            _context.persons.FirstOrDefault(person => person.Id == id).Removed = false;
        }

        public void UpdatePerson(Person updatedPerson)
        {
            var person = _context.persons.FirstOrDefault(p => p.Id == updatedPerson.Id);
            person.Name = updatedPerson.Name;
            person.Email = updatedPerson.Email;
            person.Address = updatedPerson.Address;
            person.Age = updatedPerson.Age;
            person.Status = updatedPerson.Status;
            person.Information = updatedPerson.Information;
            person.Interests = updatedPerson.Interests;
            person.Feelings = updatedPerson.Feelings;
            person.Values = updatedPerson.Values;
            person.RegistrationDate = updatedPerson.RegistrationDate;
        }
    }
}
