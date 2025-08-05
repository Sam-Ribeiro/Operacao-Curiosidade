using Microsoft.AspNetCore.Mvc;
using server.Application.Controllers.HandlerContainers;
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
        private readonly PageContentServices _services;

        public PageContentController(PageContentServices services)
        {
            _services = services;
        }

        [HttpGet("getInactiveCount")]
        public IResultBase GetInactivePersonsCount([FromQuery] GetInactiveCountQuery query)
        {
            return _services.InactiveCount.Handle(query);
        }

        [HttpGet("getPersonsCount")]
        public IResultBase GetPersonsCount([FromQuery] GetPersonsCountQuery query)
        {
            return _services.PersonsCount.Handle(query);
        }

        [HttpGet("getMonthRecordsCount")]
        public IResultBase GetMonthRecordsCount([FromQuery] GetMonthRecordCountQuery query)
        {
            return _services.MonthRecordsCount.Handle(query);
        }

        [HttpGet("getPersonsPages")]
        public IResultBase GetPersonsPages([FromQuery] GetPersonsPagesQuery query)
        {
            return _services.PersonsPages.Handle(query);
        }

        [HttpGet("getLogsPages")]
        public IResultBase GetLogsPages([FromQuery] GetLogsPagesQuery query)
        {
            return _services.LogsPages.Handle(query);
        }
        [HttpGet("getDeletePersonsPages")]
        public IResultBase GetDeletedPersonsPages([FromQuery] GetDeletedPersonsPagesQuery query)
        {
            return _services.DeletedPersonsPages.Handle(query);
        }
    }
}
