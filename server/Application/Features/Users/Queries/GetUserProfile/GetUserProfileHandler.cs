using server.Application.DTOs;
using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.Authentication;
using System.Security.Claims;

namespace server.Application.Features.Users.Queries.GetUserProfile
{
    public class GetUserProfileHandler : IQueryHandler<GetUserProfileQuery>
    {
        private readonly IReadUserRepository _readRepository;

        public GetUserProfileHandler(IReadUserRepository readRepository)
        {
            _readRepository = readRepository;
        }

        public IResultBase Handle(GetUserProfileQuery query)
        {
            Result result;
            try {
                var userToken = ReadToken.ValidateToken(query.Token);
                if (userToken == null)
                {
                    result = new Result(401, "Erro ao validar token", false);
                    return result;
                }
                int userId = Int32.Parse(userToken.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var user = _readRepository.GetUserById(userId);
                if (user == null)
                {
                    result = new Result(400, "Erro ao carregar informações do usuário.", false);
                    return result;
                }
                else {
                    result = new Result(200, "Informações carregadas", true);
                    EditUserDTO UserDTO = new EditUserDTO(user);
                    result.SetData(UserDTO);
                    return result;
                }
            } catch (Exception ex) {
                result = new Result(500, $"Erro interno ao carregar informações do usuário: {ex.Message}",false);
                return result;
            }
            
        }
    }
}
