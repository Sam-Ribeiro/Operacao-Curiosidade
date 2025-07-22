using server.Application.Commands.Interfaces;

namespace server.Application.Features.Persons.Commands.DeletePerson
{
    public class DeletePersonCommand : ICommandBase
    {
        public int Id { get; set; }
    }
}
