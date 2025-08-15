using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Services.Authentication;

namespace server.Application.Features.Users.Queries.ValidateUser
{
    public class ValidateUserHandler : IQueryHandler<ValidateUserQuery>
    {
        public IResultBase Handle(ValidateUserQuery query)
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
                else
                {
                    result = new Result(200, "Acesso concedido.", true);
                    return result;
                }
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro interno ao validar Token: {ex.Message}", false);
                return result;
            }
        }
    }
}