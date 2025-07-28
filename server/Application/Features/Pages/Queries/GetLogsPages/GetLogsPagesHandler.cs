using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Data;
using server.Infrastructure.Repositories;

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
                int logsCount = _context.logs.Count;
                int pages = (int)Math.Ceiling(logsCount / 10.0);
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
