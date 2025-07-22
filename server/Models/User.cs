using Microsoft.AspNetCore.Identity;
using server.Application.Features.Users.Commands.CreateUser;
namespace server.Models
{
    public class User
    {
        public User(CreateUserCommand command)
        {
            Name = command.Name;
            Email = command.Email;
            PasswordHash = new PasswordHasher<User>().HashPassword(this,command.Password);
            BornDate = command.BornDate;
            Removed = false;
        }

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public DateOnly BornDate { get; set; }
        public bool Removed { get; set; } = false;

    }
}
