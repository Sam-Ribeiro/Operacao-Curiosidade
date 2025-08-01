using server.Application.Features.Interfaces;

namespace server.Application.Features.Pages.Queries.GetLogsPages
{
    public class GetLogsPagesQuery : IQueryBase
    {
        public int PageSize { get; set; }
        public string? Filter { get; set; }
    }
}
