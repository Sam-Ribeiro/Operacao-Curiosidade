using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.Authentication;
using server.Services.Validation;
using server.Utils.Exceptions;
using System.Security.Claims;

namespace server.Application.Features.Users.Commands.UpdatePassword
{
    public class UpdatePasswordHandler : IHandlerBase<UpdatePasswordCommand>
    {
        private readonly IWriteUserRepository _writeRepository;
        private readonly IReadUserRepository _readRepository;
        private readonly NewPasswordValidation validation = new NewPasswordValidation();
        public UpdatePasswordHandler(IWriteUserRepository writeRepository, IReadUserRepository readRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
        }
        public IResultBase Handle(UpdatePasswordCommand command)
        {
            Result result;
            try
            {
                var userToken = ReadToken.ValidateToken(command.Token);
                if (userToken == null)
                {
                    result = new Result(401, "Acesso negado: faça login para continuar.", false);
                    return result;
                }
                if (validation.Validate(command) && command.NewPassword != command.OldPassword)
                {
                    int userId = Int32.Parse(userToken.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                    var user = _readRepository.GetUserById(userId);
                    if (user == null) 
                    {
                        result = new Result(404, "Usuário não encontrado.", false);
                        return result;
                    }
                    if (PasswordGenerator.VerifyPassword(command.OldPassword,user.Salt,user.PasswordHash))
                    {
                        _writeRepository.UpdatePassword(user, command.NewPassword);
                        result = new Result(200, "Senha alterada com sucesso!", true);
                        return result;
                    }
                    else {
                        result = new Result(403, "Senha antiga inválida.", false);
                        return result;
                    }
                }
                else { 
                    result = new Result(400,"Senha nova inválida.",false);
                    result.SetNotifications(new List<Notification>(validation.Notifications));
                    return result;
                }
            }
            catch (Exception ex){
                result = new Result(500, $"Erro ao alterar senha: {ex.Message}", false);
                return result;
            }
        }
    }
}