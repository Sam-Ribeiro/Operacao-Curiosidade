using server.Application.Commands.Interfaces;

namespace server.Application.Features.Users.Commands.UpdatePassword
{
    public class UpdatePasswordCommand : ICommandBase
    {
        public string? Token { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string NewPasswordConfirm { get; set; }
    }
}