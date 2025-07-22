using Microsoft.OpenApi.Any;
using server.Infrastructure.Data;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Infrastructure.Repositories
{
    public class ReadUserRepository : IReadUserRepository
    {
        public InMemoryContext _context;
        public ReadUserRepository(InMemoryContext context)
        {
            _context = context;
        }
        public List<User>? GetAllUsers()
        {
            return _context.users;
        }

        public User? GetUserById(int id)
        {
            return _context.users.FirstOrDefault(u => u.Id.Equals(id));
        }

        public User? GetUserByEmail(string email)
        {
            return _context.users.FirstOrDefault(u => u.Email == email);
        }
        public List<string>? GetEmails()
        {
            return _context.users?.Select(u => u.Email).ToList() ?? new List<string>();
        }
    }
}
