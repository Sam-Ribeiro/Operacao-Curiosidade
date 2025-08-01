using server.Models;
using System.Text.Json;

namespace server.Infrastructure.Data
{
    public class InMemoryContext
    {
        public List<User> users;
        public List<Person> persons;
        public List<Log> logs;

        public void SaveChanges() { 
            string jsonUsers = JsonSerializer.Serialize(users);
            string jsonPersons = JsonSerializer.Serialize(persons);
            string jsonLogs = JsonSerializer.Serialize(logs);
            File.WriteAllText("users.json",jsonUsers);
            File.WriteAllText("persons.json",jsonPersons);
            File.WriteAllText("logs.json",jsonLogs);
        }
        public void LoadContexts() {
            var jsonUsers = File.ReadAllText("users.json");
            try
            {
                users = JsonSerializer.Deserialize<List<User>>(jsonUsers);
            }
            catch (Exception ex)
            {
                users = new List<User>();
            }

            var jsonPersons = File.ReadAllText("persons.json");
            try
            {
                persons = JsonSerializer.Deserialize<List<Person>>(jsonPersons);
            }
            catch (Exception ex)
            {
                persons = new List<Person>();
            }

            var jsonLogs = File.ReadAllText("logs.json");
            try
            {
                logs = JsonSerializer.Deserialize<List<Log>>(jsonLogs);
            }
            catch (Exception ex) 
            {
                logs = new List<Log>();
            }
        }
    }
}
