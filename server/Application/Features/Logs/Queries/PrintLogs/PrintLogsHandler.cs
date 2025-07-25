using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Data;
using server.Services.Authentication;
using server.Services.DataSelection;
using System.Security.Claims;

namespace server.Application.Features.Logs.Queries.PrintLogs
{
    public class PrintLogsHandler : IQueryHandler<PrintLogsQuery>
    {
        private readonly InMemoryContext _context;

        public PrintLogsHandler(InMemoryContext context)
        {
            _context = context;
        }

        public IResultBase Handle(PrintLogsQuery query)
        {
            Result result;
            try
            {
                var user = ReadToken.ValidateToken(query.Token);
                if (user == null)
                {
                    result = new Result(401, "Erro ao validar token", false);
                    return result;
                }
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                _context.LoadContexts();
                var logs = _context.logs;
                if (logs.Count() == 0)
                {
                    result = new Result(400, "Nenhum Log cadastrado", false);
                    return result;
                }
                else
                {
                    var data = DataSelect.SelectLogs(logs, query.Filter, -1 ,query.Order);
                    result = new Result(200, "Logs Encontrados", true);
                    result.SetData(data);
                    return result;
                }
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro interno ao imprimir logs: {ex.Message}", false);
                return result;
            }
        }
    }
}

