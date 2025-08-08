using Microsoft.AspNetCore.Mvc;
using server.Application.Controllers.HandlerContainers;
using server.Application.Features.Logs.Queries.GetLogs;
using server.Application.Results;

namespace server.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly LogServices _services;

        public LogController(LogServices services)
        {
            _services = services;
        }

        [HttpGet("getLogs")]
        public IResultBase GetLogs([FromQuery] GetLogsQuery query)
        {
            query.Token = Request.Headers["Authorization"].ToString();
            return _services.GetLogs.Handle(query);
        }
    }
}
