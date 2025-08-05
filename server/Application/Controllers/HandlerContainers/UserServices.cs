using server.Application.Commands.Interfaces;
using server.Application.Features.Interfaces;
using server.Application.Features.Users.Commands.CreateUser;
using server.Application.Features.Users.Commands.Login;
using server.Application.Features.Users.Commands.UpdatePassword;
using server.Application.Features.Users.Commands.UpdateUser;
using server.Application.Features.Users.Queries.GetUserProfile;

namespace server.Application.Controllers.HandlerContainers
{
    public class UserServices
    {
        public IHandlerBase<CreateUserCommand> Create { get; set; }
        public IHandlerBase<LoginCommand> Login { get; set; }
        public IHandlerBase<UpdatePasswordCommand> UpdatePassword { get; set; }
        public IHandlerBase<UpdateUserCommand> UpdateUser { get; set; }
        public IQueryHandler<GetUserProfileQuery> QueryProfile { get; set; }

        public UserServices(
            IHandlerBase<CreateUserCommand> create,
            IHandlerBase<LoginCommand> login,
            IHandlerBase<UpdatePasswordCommand> updatePassword,
            IHandlerBase<UpdateUserCommand> updateUser,
            IQueryHandler<GetUserProfileQuery> queryProfile
            )
        {
            Create = create;
            Login = login;
            UpdatePassword = updatePassword;
            UpdateUser = updateUser;
            QueryProfile = queryProfile;
        }
    }
}
