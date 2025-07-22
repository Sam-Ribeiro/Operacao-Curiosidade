using server.Application.Commands.Interfaces;

namespace server.Application.Features.Users.Commands.CreateUser
{
    public class CreateUserCommand : ICommandBase
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
        public DateOnly BornDate { get; set; }
    }
}
