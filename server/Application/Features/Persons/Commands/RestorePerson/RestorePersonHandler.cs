using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.Authentication;
using System.Security.Claims;

namespace server.Application.Features.Persons.Commands.RestorePerson
{
    public class RestorePersonHandler : IHandlerBase<RestorePersonCommand>
    {
        private readonly IWritePerson _writeRepository;
        private readonly IReadPerson _readRepository;
        public RestorePersonHandler(IWritePerson writeRepository, IReadPerson readRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
        }
        public IResultBase Handle(RestorePersonCommand command)
        {
            Result result;
            try
            {
                var user = ReadToken.ValidateToken(command.Token);
                if (user == null)
                {
                    result = new Result(401, "Acesso negado: faça login para continuar.", false);
                    return result;
                }
                if (_readRepository.GetPersonById(command.Id) == null)
                {
                    result = new Result(400, "Erro ao restaurar pessoa: pessoa nao encontrada.", false);
                    return result;
                }
                else
                {
                    int userId = Int32.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                    _writeRepository.RestorePerson(command.Id,userId);
                    result = new Result(200, "Pessoa restaurado com sucesso", true);
                    return result;
                }
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro interno ao restaurar pessoa: {ex.Message}", false);
                return result;
            }
        }
    }
}