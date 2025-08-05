using server.Application.Features.Interfaces;
using server.Application.Features.Logs.Queries.GetLogs;

namespace server.Application.Controllers.HandlerContainers
{
    public class LogServices
    {
        public IQueryHandler<GetLogsQuery> GetLogs { get; set; }
        public LogServices(IQueryHandler<GetLogsQuery> getLogs)
        {
            GetLogs = getLogs;
        }
    }
}
