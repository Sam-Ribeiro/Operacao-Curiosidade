using server.Application.Features.Interfaces;

namespace server.Application.Features.Logs.Queries.PrintLogs
{
    public class PrintLogsQuery : IQueryBase
    {
        public string? Token { get; set; }
        public int Order { get; set; }
        public string? Filter { get; set; }
    }
}
