using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.Authentication;
using System.Security.Claims;

namespace server.Application.Features.Users.Queries.GetUserName
{
    public class GetUserNameHandler : IQueryHandler<GetUserNameQuery>
    {
        private readonly IReadUserRepository _readRepository;

        public GetUserNameHandler(IReadUserRepository readRepository)
        {
            _readRepository = readRepository;
        }
        public IResultBase Handle(GetUserNameQuery query)
        {
            Result result;
            try
            {
                var userToken = ReadToken.ValidateToken(query.Token);
                if (userToken == null)
                {
                    result = new Result(401, "Acesso negado: faça login para continuar.", false);
                    return result;
                }
                int userId = Int32.Parse(userToken.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var user = _readRepository.GetUserById(userId);
                if (user == null)
                {
                    result = new Result(400, "Erro ao carregar nome do usuário.", false);
                    return result;
                }
                else
                {
                    result = new Result(200, "Nome Carregado", true);
                    result.SetData(user.Name);
                    return result;
                }
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro interno ao carregar nome do usuário: {ex.Message}", false);
                return result;
            }
        }
    }
}