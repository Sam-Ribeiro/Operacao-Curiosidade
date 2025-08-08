using server.Application.Features.Interfaces;

namespace server.Application.Features.Persons.Queries.GetPersonData
{
    public class GetPersonDataQuery : IQueryBase
    {
        public int Id { get; set; }
        public string? Token { get; set; }

    }
}