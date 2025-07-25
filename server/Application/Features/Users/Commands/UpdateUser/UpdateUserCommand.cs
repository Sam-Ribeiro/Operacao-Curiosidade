using server.Application.Commands.Interfaces;

namespace server.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserCommand : ICommandBase
    {
        public string? Token { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public DateOnly BornDate { get; set; }
    }
}
