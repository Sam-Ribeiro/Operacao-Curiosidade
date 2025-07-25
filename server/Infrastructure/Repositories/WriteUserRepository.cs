using server.Infrastructure.Data;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
namespace server.Repositories
{
    public class WriteUserRepository : IWriteUserRepository
    {
        public InMemoryContext _context;
        public WriteUserRepository(InMemoryContext context) { 
            _context = context;
            _context.LoadContexts();
        }
        public void AddUser(User user)
        {
            List<User> users = _context.users;
            user.Id = users.Any() ? users.Max(p => p.Id) + 1 : 1;
            _context.users.Add(user);
            _context.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            User user = _context.users.FirstOrDefault(u => u.Id.Equals(id));
            user.Removed = true;
            _context.SaveChanges();
        }
        public void UpdateUser(User updatedUser)
        {
            User user = _context.users.FirstOrDefault(u => u.Id.Equals(updatedUser.Id));
            if (user != null)
            {
                user.Name = updatedUser.Name;
                user.Email = updatedUser.Email;
                user.BornDate = updatedUser.BornDate;
                user.PasswordHash = updatedUser.PasswordHash;
            }
            _context.SaveChanges();
        }
    }
}
