using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Data;
using server.Services.DataSelection;

namespace server.Application.Features.Pages.Queries.GetLogsPages
{
    public class GetLogsPagesHandler : IQueryHandler<GetLogsPagesQuery>
    {
        private readonly InMemoryContext _context;

        public GetLogsPagesHandler(InMemoryContext context)
        {
            _context = context;
        }
        public IResultBase Handle(GetLogsPagesQuery query)
        {
            Result result;
            try 
            {
                int logsCount = DataSelect.SelectLogs(_context.logs, query.Filter, -1, -1, -1).Count;
                int pages = (int)Math.Ceiling(logsCount / (double)query.PageSize);
                result = new Result(200, "", true);
                result.SetData(pages);
                return result;
            } 
            catch (Exception ex) 
            {
                result = new Result(500, $"Erro ao carregar quantidade de páginas de logs: {ex.Message}", false);
                return result;
            }
        }
    }
}