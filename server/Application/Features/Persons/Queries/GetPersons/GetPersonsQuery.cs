using server.Application.Features.Interfaces;

namespace server.Application.Features.Persons.Queries.GetPersons
{
    public class GetPersonsQuery : IQueryBase
    {
        public string? Token { get; set; }
        public int Page { get; set; }
        public int Order { get; set; }
        public string? Filter { get; set; }
    }
}
