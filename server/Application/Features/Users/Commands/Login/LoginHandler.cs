using Microsoft.AspNetCore.Identity;
using server.Application.Commands.Interfaces;
using server.Application.DTOs;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using server.Services.Authentication;

namespace server.Application.Features.Users.Commands.Login
{
    public class LoginHandler : IHandlerBase<LoginCommand>
    {
        private readonly IWriteUserRepository _writeRepository;
        private readonly IReadUserRepository _readRepository;
        private readonly ICreateToken _createToken;
        public LoginHandler(IWriteUserRepository writeRepository, IReadUserRepository readRepository,
            ICreateToken createToken)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
            _createToken = createToken;
        }

        public IResultBase Handle(LoginCommand command)
        {
            Result result;
            try
            {
                var user = _readRepository.GetUserByEmail(command.Email);
                if (user != null)
                {
                    if (user.Email == command.Email)
                    {
                        if (PasswordGenerator.VerifyPassword(command.Password,user.Salt,user.PasswordHash))
                        {
                            result = new Result(200, "Login realizado", true);
                            UserLoggedDTO userDTO = new UserLoggedDTO(user);
                            var token = _createToken.Generate(user);
                            var data = new { token, userDTO };
                            result.SetData(data);
                            return result;
                        }
                    }
                }
                result = new Result(400, "Email ou senha invalidos", false);
                return result;
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro ao logar: {ex.Message}", false);
                return result;
            }
        }
    }
}