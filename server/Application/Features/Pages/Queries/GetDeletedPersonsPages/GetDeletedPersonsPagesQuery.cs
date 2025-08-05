using server.Application.Features.Interfaces;

namespace server.Application.Features.Pages.Queries.GetDeletedPersonsPages
{
    public class GetDeletedPersonsPagesQuery : IQueryBase
    {
        public int PageSize { get; set; }
        public string? Filter { get; set; }
    }
}