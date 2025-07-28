using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Application.Features.Interfaces;
using server.Application.Features.Logs.Queries.GetLogs;
using server.Application.Features.Pages.Queries.GetDeletedPersonsPages;
using server.Application.Features.Pages.Queries.GetLogsPages;
using server.Application.Features.Pages.Queries.GetPersonsPages;
using server.Application.Features.Persons.Queries.GetInactiveCount;
using server.Application.Features.Persons.Queries.GetLastMonthRecordCount;
using server.Application.Features.Persons.Queries.GetPersonsCount;
using server.Application.Results;

namespace server.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageContentController : ControllerBase
    {
        private readonly IQueryHandler<GetInactiveCountQuery> _inactiveCount;
        private readonly IQueryHandler<GetPersonsCountQuery> _personsCount;
        private readonly IQueryHandler<GetMonthRecordCountQuery> _monthRecordsCount;
        private readonly IQueryHandler<GetPersonsPagesQuery> _personsPages;
        private readonly IQueryHandler<GetLogsPagesQuery> _logsPages;
        private readonly IQueryHandler<GetDeletedPersonsPagesQuery> _deletedPersonsPages;

        public PageContentController(
            IQueryHandler<GetInactiveCountQuery> inactiveCount,
            IQueryHandler<GetPersonsCountQuery> personsCount, 
            IQueryHandler<GetMonthRecordCountQuery> monthRecordsCount,
            IQueryHandler<GetPersonsPagesQuery> personsPages,
            IQueryHandler<GetLogsPagesQuery> logsPages,
            IQueryHandler<GetDeletedPersonsPagesQuery> deletedPersonsPages
            )
        {
            _inactiveCount = inactiveCount;
            _personsCount = personsCount;
            _monthRecordsCount = monthRecordsCount;
            _personsPages = personsPages;
            _logsPages = logsPages;
            _deletedPersonsPages = deletedPersonsPages;
        }

        [HttpGet("getInactiveCount")]
        public IResultBase GetInactivePersonsCount([FromQuery] GetInactiveCountQuery query)
        {
            return _inactiveCount.Handle(query);
        }

        [HttpGet("getPersonsCount")]
        public IResultBase GetPersonsCount([FromQuery] GetPersonsCountQuery query)
        {
            return _personsCount.Handle(query);
        }

        [HttpGet("getMonthRecordsCount")]
        public IResultBase GetMonthRecordsCount([FromQuery] GetMonthRecordCountQuery query)
        {
            return _monthRecordsCount.Handle(query);
        }

        [HttpGet("getPersonsPages")]
        public IResultBase GetPersonsPages([FromQuery] GetPersonsPagesQuery query)
        {
            return _personsPages.Handle(query);
        }

        [HttpGet("getLogsPages")]
        public IResultBase GetLogsPages([FromQuery] GetLogsPagesQuery query)
        {
            return _logsPages.Handle(query);
        }
        [HttpGet("getDeletePersonsPages")]
        public IResultBase GetDeletedPersonsPages([FromQuery] GetDeletedPersonsPagesQuery query)
        {
            return _deletedPersonsPages.Handle(query);
        }
    }
}
