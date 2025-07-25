using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Application.Features.Interfaces;
using server.Application.Features.Logs.Queries.GetLogs;
using server.Application.Features.Logs.Queries.PrintLogs;
using server.Application.Results;
using server.Services.Authentication;
using System.Net;
using System.Security.Claims;

namespace server.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly IQueryHandler<GetLogsQuery> _getLogs;
        private readonly IQueryHandler<PrintLogsQuery> _printLogs;

        public LogController(IQueryHandler<GetLogsQuery> getLogs, IQueryHandler<PrintLogsQuery> printLogs)
        {
            _getLogs = getLogs;
            _printLogs = printLogs;
        }

        [HttpGet("getLogs")]
        public IResultBase GetLogs([FromQuery] GetLogsQuery query)
        {
            query.Token = Request.Headers["Authorization"].ToString();
            return _getLogs.Handle(query);
        }
        [HttpGet("printLogs")]
        public IResultBase PrintLogs([FromQuery] PrintLogsQuery query)
        {
            query.Token = Request.Headers["Authorization"].ToString();
            return _printLogs.Handle(query);
        }
    }
}
