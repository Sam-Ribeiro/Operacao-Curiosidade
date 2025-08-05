using server.Application.Features.Interfaces;
using server.Application.Features.Pages.Queries.GetDeletedPersonsPages;
using server.Application.Features.Pages.Queries.GetLogsPages;
using server.Application.Features.Pages.Queries.GetPersonsPages;
using server.Application.Features.Persons.Queries.GetInactiveCount;
using server.Application.Features.Persons.Queries.GetLastMonthRecordCount;
using server.Application.Features.Persons.Queries.GetPersonsCount;

namespace server.Application.Controllers.HandlerContainers
{
    public class PageContentServices
    {
        public IQueryHandler<GetInactiveCountQuery> InactiveCount { get; set; }
        public IQueryHandler<GetPersonsCountQuery> PersonsCount { get; set; }
        public IQueryHandler<GetMonthRecordCountQuery> MonthRecordsCount { get; set; }
        public IQueryHandler<GetPersonsPagesQuery> PersonsPages { get; set; }
        public IQueryHandler<GetLogsPagesQuery> LogsPages { get; set; }
        public IQueryHandler<GetDeletedPersonsPagesQuery> DeletedPersonsPages { get; set; }

        public PageContentServices(
            IQueryHandler<GetInactiveCountQuery> inactiveCount,
            IQueryHandler<GetPersonsCountQuery> personsCount,
            IQueryHandler<GetMonthRecordCountQuery> monthRecordsCount,
            IQueryHandler<GetPersonsPagesQuery> personsPages,
            IQueryHandler<GetLogsPagesQuery> logsPages,
            IQueryHandler<GetDeletedPersonsPagesQuery> deletedPersonsPages
            )
        {
            InactiveCount = inactiveCount;
            PersonsCount = personsCount;
            MonthRecordsCount = monthRecordsCount;
            PersonsPages = personsPages;
            LogsPages = logsPages;
            DeletedPersonsPages = deletedPersonsPages;
        }
    }
}
