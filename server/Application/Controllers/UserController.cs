using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Application.Features.Users.Commands.CreateUser;
using server.Application.Results;
using server.Application.Commands.Interfaces;
using server.Application.Features.Users.Commands.Login;
using server.Application.Features.Users.Commands.UpdatePassword;
using Microsoft.AspNetCore.Authorization;
using server.Application.Features.Users.Commands.UpdateUser;
using server.Application.Features.Interfaces;
using server.Application.Features.Users.Queries.GetUserProfile;

namespace server.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHandlerBase<CreateUserCommand> _create;
        private readonly IHandlerBase<LoginCommand> _login;
        private readonly IHandlerBase<UpdatePasswordCommand> _updatePassword;
        private readonly IHandlerBase<UpdateUserCommand> _updateUser;
        private readonly IQueryHandler<GetUserProfileQuery> _queryProfile;
        public UserController(IHandlerBase<CreateUserCommand> create, IHandlerBase<LoginCommand> login,
            IHandlerBase<UpdatePasswordCommand> updatePassword, IHandlerBase<UpdateUserCommand> updateUser,
            IQueryHandler<GetUserProfileQuery> queryProfile)
        {
            _create = create;
            _login = login;
            _updatePassword = updatePassword;
            _updateUser = updateUser;
            _queryProfile = queryProfile;
        }
        // Command 

        [HttpPost("register")]
        public IResultBase InsertUser(CreateUserCommand command)
        {
            return _create.Handle(command);
        }

        [HttpPost("login")]
        public IResultBase Login(LoginCommand command) { 
            return _login.Handle(command);
        }

        [HttpPut("updatePassword")]
        public IResultBase UpdatePassword(UpdatePasswordCommand command) {
            command.Token = Request.Headers["Authorization"].ToString();
            return _updatePassword.Handle(command);
        }

        [HttpPut("updateUser")]
        public IResultBase UpdateUser(UpdateUserCommand command) {
            command.Token = Request.Headers["Authorization"].ToString();
            return _updateUser.Handle(command);
        }

        // Query

        [HttpGet("getProfile/{id}")]
        public IResultBase GetUserProfile([FromRoute] int id) {
            GetUserProfileQuery query = new GetUserProfileQuery() { Id = id };
            query.Token = Request.Headers["Authorization"].ToString();
            return _queryProfile.Handle(query);
        }
    }
}
