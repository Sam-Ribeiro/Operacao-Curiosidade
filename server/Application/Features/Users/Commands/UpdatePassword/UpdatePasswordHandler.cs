using Microsoft.AspNetCore.Identity;
using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using server.Services.Validation;
using server.Utils.Exceptions;

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
                if (validation.Validate(command)){
                    var user = _readRepository.GetUserById(command.Id);
                    if (user == null) {
                        result = new Result(404, "Usuário não encontrado", false);
                        return result;
                    }
                    if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash,
                    command.OldPassword) == PasswordVerificationResult.Success){
                        user.PasswordHash = new PasswordHasher<User>().HashPassword(user, command.NewPassword);
                        _writeRepository.UpdateUser(user);
                        result = new Result(200, "Senha alterada", true);
                        return result;
                    }
                    else {
                        result = new Result(401, "Senha antiga inválida", true);
                        return result;
                    }

                }
                else { 
                    result = new Result(400,"Senha nova inválida",true);
                    result.SetNotifications(new List<Notification>(validation.Notifications));
                    return result;
                }
            }
            catch (Exception ex){
                result = new Result(500, $"Erro ao cadastrar usuário ${ex.Message}", false);
                return result;
            }
        }
    }
}
