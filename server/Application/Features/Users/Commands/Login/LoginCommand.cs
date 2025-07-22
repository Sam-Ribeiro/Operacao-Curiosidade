using server.Application.Commands.Interfaces;

namespace server.Application.Features.Users.Commands.Login
{
    public class LoginCommand : ICommandBase
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
