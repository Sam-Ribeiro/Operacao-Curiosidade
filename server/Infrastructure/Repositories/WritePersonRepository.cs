using server.Infrastructure.Data;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using server.Services.EventLog;

namespace server.Infrastructure.Repositories
{
    public class WritePersonRepository : IWritePerson
    {
        public InMemoryContext _context;
        public WritePersonRepository(InMemoryContext context)
        {
            _context = context;
            _context.LoadContexts();
        }

        public void AddPerson(Person person, int userId)
        {
            List<Person> persons = _context.persons;
            person.Id = persons.Any() ? persons.Max(p => p.Id) + 1 : 1;
            _context.persons.Add(person);

            var username = _context.users.FirstOrDefault(user => user.Id == userId).Name;
            Log log = PersonLogs.CreatePersonLog(person.Name, username);
            AddLog(log);
            _context.SaveChanges();
        }

        public void DeletePerson(int id, int userId)
        {
            Person person = _context.persons.FirstOrDefault(person => person.Id == id);
            person.Removed = true;
            person.Status = false;

            var username = _context.users.FirstOrDefault(user => user.Id == userId).Name;
            Log log = PersonLogs.DeletePersonLog(person.Name, username);
            AddLog(log);
            _context.SaveChanges();
        }

        public void RestorePerson(int id, int userId)
        {
            Person person = _context.persons.FirstOrDefault(person => person.Id == id);
            person.Removed = false;

            var username = _context.users.FirstOrDefault(user => user.Id == userId).Name;
            Log log = PersonLogs.RestorePersonLog(person.Name, username);
            AddLog(log);
            _context.SaveChanges();
        }

        public void UpdatePerson(Person updatedPerson, int userId)
        {
            var person = _context.persons.FirstOrDefault(p => p.Id == updatedPerson.Id);
            var username = _context.users.FirstOrDefault(user => user.Id == userId).Name;
            Log? log = PersonLogs.UpdatePersonLog(person, updatedPerson, username);
            
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
            if(log != null)
            {
                AddLog(log);
            } 
            _context.SaveChanges();
        }

        public void AddLog(Log log)
        {
            List<Log> logs = _context.logs;
            log.Id = logs.Count() + 1;
            _context.logs.Add(log);
        }

    }
}
