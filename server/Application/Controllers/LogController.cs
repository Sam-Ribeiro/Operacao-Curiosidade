using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Application.Features.Interfaces;
using server.Application.Features.Logs.Queries.GetLogs;
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

        public LogController(IQueryHandler<GetLogsQuery> getLogs)
        {
            _getLogs = getLogs;
        }

        [HttpGet("getLogs")]
        public IResultBase GetLogs([FromQuery] GetLogsQuery query)
        {
            query.Token = Request.Headers["Authorization"].ToString();
            return _getLogs.Handle(query);
        }
    }
}
