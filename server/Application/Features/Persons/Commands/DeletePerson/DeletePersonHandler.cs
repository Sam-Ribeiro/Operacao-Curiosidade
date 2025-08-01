using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.Authentication;
using System.Security.Claims;

namespace server.Application.Features.Persons.Commands.DeletePerson
{
    public class DeletePersonHandler : IHandlerBase<DeletePersonCommand>
    {
        private readonly IWritePerson _writeRepository;
        private readonly IReadPerson _readRepository;

        public DeletePersonHandler(IWritePerson writeRepository, IReadPerson readRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
        }

        public IResultBase Handle(DeletePersonCommand command)
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
                    result = new Result(400, "Erro ao deletar pessoa: pessoa nao encontrada.", false);
                    return result;
                }
                else {
                    int userId = Int32.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                    _writeRepository.DeletePerson(command.Id,userId);
                    result = new Result(200, "Pessoa deletada com sucesso", true);
                    return result;
                }
            }
            catch (Exception ex) {
                result = new Result(500, $"Erro interno ao deletar pessoa: {ex.Message}", false);
                return result;
            }
        }
    }
}
