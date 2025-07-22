using server.Application.Commands.Interfaces;

namespace server.Application.Features.Persons.Commands.UpdatePerson
{
    public class UpdatePersonCommand : ICommandBase
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public bool Status { get; set; }
        public int Age { get; set; }
        public string? Address { get; set; }
        public string? Information { get; set; }
        public string? Interests { get; set; }
        public string? Feelings { get; set; }
        public string? Values { get; set; }
    }
}
