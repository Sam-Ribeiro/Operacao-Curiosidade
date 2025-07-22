using server.Application.Commands.Interfaces;

namespace server.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserCommand : ICommandBase
    {
        public UpdateUserCommand(int id, string name, string email, DateOnly bornDate)
        {
            Id = id;
            Name = name;
            Email = email;
            BornDate = bornDate;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateOnly BornDate { get; set; }
    }
}
