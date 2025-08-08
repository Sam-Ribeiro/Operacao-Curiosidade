using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using server.Services.Validation;
using server.Utils.Exceptions;

namespace server.Application.Features.Users.Commands.CreateUser
{
    public class CreateUserHandler : IHandlerBase<CreateUserCommand>
    {
        private readonly IWriteUserRepository _writeRepository;
        private readonly IReadUserRepository _readRepository;
        private readonly UserValidation validation = new UserValidation();
        public CreateUserHandler(IWriteUserRepository writeRepository, IReadUserRepository readRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
        }
        public IResultBase Handle(CreateUserCommand command)
        {
            Result result;
            if (validation.Validate(command, _readRepository.GetEmails()))
            {
                try
                {
                    User user = new User(command);
                    _writeRepository.AddUser(user);
                    result = new Result(201, "Usuário cadastrado", true);
                    return result;
                }
                catch (Exception ex)
                {
                    result = new Result(500, $"Erro ao cadastrar usuário: {ex.Message}", false);
                    return result;
                }
            }
            else
            {
                result = new Result(400, $"Erro ao validar usuário", false);
                result.SetNotifications(new List<Notification>(validation.Notifications));
                return result;
            }
        }
    }
}