using server.Application.Features.Users.Commands.CreateUser;
using server.Services.Authentication;
namespace server.Models
{
    public class User
    {
        public User()
        {
        }

        public User(CreateUserCommand command)
        {
            Name = command.Name;
            Email = command.Email;
            Salt = PasswordGenerator.GenerateSalt();
            PasswordHash = PasswordGenerator.CreatePassword(command.Password, Salt);
            BornDate = command.BornDate;
        }

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public DateOnly BornDate { get; set; }
        public byte[] Salt { get; set; }
    }
}