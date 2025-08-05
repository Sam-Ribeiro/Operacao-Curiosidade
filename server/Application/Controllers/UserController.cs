using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using server.Application.Controllers.HandlerContainers;
using server.Application.Features.Users.Commands.CreateUser;
using server.Application.Features.Users.Commands.Login;
using server.Application.Features.Users.Commands.UpdatePassword;
using server.Application.Features.Users.Commands.UpdateUser;
using server.Application.Features.Users.Queries.GetUserProfile;
using server.Application.Results;

namespace server.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserServices _services;
        public UserController(
            UserServices services
            )
        {
            _services = services;
        }

        [HttpPost("register")]
        public IResultBase InsertUser(CreateUserCommand command)
        {
            return _services.Create.Handle(command);
        }

        [HttpPost("login")]
        [EnableRateLimiting("fixed")]
        public IResultBase Login(LoginCommand command) { 
            return _services.Login.Handle(command);
        }

        [HttpPut("updatePassword")]
        public IResultBase UpdatePassword(UpdatePasswordCommand command) {
            command.Token = Request.Headers["Authorization"].ToString();
            return _services.UpdatePassword.Handle(command);
        }

        [HttpPut("updateUser")]
        public IResultBase UpdateUser(UpdateUserCommand command) {
            command.Token = Request.Headers["Authorization"].ToString();
            return _services.UpdateUser.Handle(command);
        }

        [HttpGet("getProfile")]
        public IResultBase GetUserProfile([FromQuery] GetUserProfileQuery query) {
            query.Token = Request.Headers["Authorization"].ToString();
            return _services.QueryProfile.Handle(query);
        }
    }
}
