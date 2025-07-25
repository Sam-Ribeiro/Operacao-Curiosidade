using server.Application.Features.Interfaces;

namespace server.Application.Features.Persons.Queries.PrintDeletedPersons
{
    public class PrintDeletePersonsQuery : IQueryBase
    {
        public string? Token { get; set; }
        public int Order { get; set; }
        public string? Filter { get; set; }
    }
}
