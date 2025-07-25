using server.Application.Features.Interfaces;

namespace server.Application.Features.Persons.Queries.PrintPersons
{
    public class PrintPersonsQuery : IQueryBase
    {
        public string? Token { get; set; }
        public int Order { get; set; }
        public string? Filter { get; set; }
    }
}
