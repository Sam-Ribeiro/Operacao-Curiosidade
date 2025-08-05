using server.Application.Commands.Interfaces;

namespace server.Application.Features.Persons.Commands.RestorePerson
{
    public class RestorePersonCommand : ICommandBase
    {
        public int Id { get; set; }
        public string? Token { get; set; }
    }
}