using server.Infrastructure.Data;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using server.Services.EventLog;

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
            Log log = UserLogs.RegisterLog(user.Email, user.Name);
            AddLog(log);
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
                Log? log = UserLogs.UpdateUserLog(user, updatedUser);
                user.Name = updatedUser.Name;
                user.Email = updatedUser.Email;
                user.BornDate = updatedUser.BornDate;
                user.PasswordHash = updatedUser.PasswordHash;
                if (log != null)
                {
                    AddLog(log);
                }
                _context.SaveChanges();
            }
        }

        public void AddLog(Log log)
        {
            List<Log> logs = _context.logs;
            log.Id = logs.Count() + 1;
            _context.logs.Add(log);
        }
    }
}
