
using server.Application.Commands.Interfaces;
using server.Application.Controllers;
using server.Application.Features.Interfaces;
using server.Application.Features.Users.Commands.CreateUser;
using server.Application.Features.Users.Commands.Login;
using server.Application.Features.Users.Commands.UpdatePassword;
using server.Application.Features.Users.Commands.UpdateUser;
using server.Application.Features.Users.Queries.GetUserProfile;

namespace tests.UserTests
{
    public class Register
    {
        private readonly IHandlerBase<CreateUserCommand> _create;
        private readonly IHandlerBase<LoginCommand> _login;
        private readonly IHandlerBase<UpdatePasswordCommand> _updatePassword;
        private readonly IHandlerBase<UpdateUserCommand> _updateUser;
        private readonly IQueryHandler<GetUserProfileQuery> _queryProfile;
        public Register(IHandlerBase<CreateUserCommand> create, IHandlerBase<LoginCommand> login,
            IHandlerBase<UpdatePasswordCommand> updatePassword, IHandlerBase<UpdateUserCommand> updateUser,
            IQueryHandler<GetUserProfileQuery> queryProfile) 
        {
            _create = create;
            _login = login;
            _updatePassword = updatePassword;
            _updateUser = updateUser;
            _queryProfile = queryProfile;
        }
        [Fact]
        public void register()
        {
            UserController controller = new UserController(_create, _login, _updatePassword, _updateUser, _queryProfile);
            CreateUserCommand command = new CreateUserCommand()
            {
                Name = "valid name",
                Email = "valid@email.com",
                Password = "password",
                PasswordConfirm = "password",
                BornDate = DateOnly.FromDateTime(DateTime.Now.AddYears(-20)),
            };

            controller.InsertUser(command);
        }
    }
}