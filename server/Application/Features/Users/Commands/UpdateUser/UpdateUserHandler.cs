using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.Authentication;
using server.Services.Validation;
using server.Utils.Exceptions;
using System.Security.Claims;

namespace server.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserHandler : IHandlerBase<UpdateUserCommand>
    {
        private readonly IWriteUserRepository _writeRepository;
        private readonly IReadUserRepository _readRepository;
        private readonly UpdateUserValidation validation = new UpdateUserValidation();
        public UpdateUserHandler(IWriteUserRepository writeRepository, IReadUserRepository readUserRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readUserRepository;
        }

        public IResultBase Handle(UpdateUserCommand command)
        {
            Result result;
            try
            {
                var userToken = ReadToken.ValidateToken(command.Token);
                if (userToken == null)
                {
                    result = new Result(401, "Erro ao validar token", false);
                    return result;
                }
                int userId = Int32.Parse(userToken.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var user = _readRepository.GetUserById(userId);
                var otherEmails = _readRepository.GetEmails().FindAll(email => email != user.Email);
                if (validation.Validate(command, otherEmails))
                {
                    user.Email = command.Email;
                    user.Name = command.Name;
                    user.BornDate = command.BornDate;
                    _writeRepository.UpdateUser(user);
                    result = new Result(200, "Usuário Alterado com sucesso!", true);
                    return result;
                }
                else {
                    result = new Result(400, "Erro ao validar alterações", false);
                    result.SetNotifications(new List<Notification>(validation.Notifications));
                    return result;
                }
            }
            catch (Exception ex) {
                result = new Result(500, $"Erro ao editar usuário: {ex.Message}",false);
                return result;
            }
        }
    }
}
