using server.Application.Features.Interfaces;

namespace server.Application.Features.Logs.Queries.GetLogs
{
    public class GetLogsQuery : IQueryBase
    {
        public string? Token { get; set; }
        public int Page { get; set; }
        public int Order { get; set; }
        public int PageSize { get; set; }
        public string? Filter { get; set; }
    }
}
