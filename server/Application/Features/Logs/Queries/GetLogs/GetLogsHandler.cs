using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Data;
using server.Services.Authentication;
using server.Services.DataSelection;
using System.Security.Claims;

namespace server.Application.Features.Logs.Queries.GetLogs
{
    public class GetLogsHandler : IQueryHandler<GetLogsQuery>
    {
        private readonly InMemoryContext _context;

        public GetLogsHandler(InMemoryContext context)
        {
            _context = context;
        }

        public IResultBase Handle(GetLogsQuery query)
        {
            Result result;
            try
            {
                var user = ReadToken.ValidateToken(query.Token);
                if(user == null) {
                    result = new Result(401, "Acesso negado: faça login para continuar.", false);
                    return result;
                }
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
                _context.LoadContexts();
                var logs = _context.logs;
                if (logs.Count() == 0)
                {
                    result = new Result(400, "Nenhum Log cadastrado", true);
                    return result;
                }
                else
                {
                    var data = DataSelect.SelectLogs(logs,query.Filter,query.Page,query.Order,query.PageSize);
                    result = new Result(200, "Logs Encontrados", true);
                    result.SetData(data);
                    return result;
                }
            }
            catch (Exception ex) { 
                result = new Result(500, $"Erro interno ao buscar logs: {ex.Message}",false);
                return result;
            }
        }
    }
}
