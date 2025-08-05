using server.Application.Features.Interfaces;

namespace server.Application.Features.Pages.Queries.GetPersonsPages
{
    public class GetPersonsPagesQuery : IQueryBase
    {
        public int PageSize { get; set; }
        public string? Filter { get; set; }
    }
}