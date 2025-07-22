using server.Models;

namespace server.Infrastructure.Data
{
    public class InMemoryContext
    {
        public List<User> users = new List<User>();
        public List<Person> persons = new List<Person>();
    }
}
