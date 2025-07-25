using Microsoft.AspNetCore.Identity;
using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
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
                    result = new Result(401, "Erro ao validar token", false);
                    return result;
                }
                if (validation.Validate(command)){
                    int userId = Int32.Parse(userToken.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                    var user = _readRepository.GetUserById(userId);
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
                        result = new Result(400, "Senha antiga inválida", false);
                        return result;
                    }
                }
                else { 
                    result = new Result(400,"Senha nova inválida",false);
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
