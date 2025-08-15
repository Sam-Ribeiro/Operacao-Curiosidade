
using Moq;
using server.Application.Features.Users.Commands.CreateUser;
using server.Application.Features.Users.Commands.Login;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.Authentication;
using System.Text.Json;

namespace server.tests.Features.User
{
    public class Login
    {
        [Fact]
        public void Login_NotValid()
        {
            // Arrange
            var mockWriteRepo = new Mock<IWriteUserRepository>();
            var mockReadRepo = new Mock<IReadUserRepository>();
            var mockCreateToken = new Mock<ICreateToken>();

            LoginCommand command = new LoginCommand();
            command.Email = "samuelinexistente@gmail.com";
            command.Password = "senha123";

            mockReadRepo
                .Setup(r => r.GetUserByEmail(command.Email))
                .Returns(new Models.User());

            var handler = new LoginHandler(
                mockWriteRepo.Object,
                mockReadRepo.Object, 
                mockCreateToken.Object
            );

            // Act
            Result result = (Result)handler.Handle(command);

            // Assert
            Assert.Equal(400, result.ResultCode);
        }

        [Fact]
        public void Login_Valid()
        {
            // Arrange
            var mockWriteRepo = new Mock<IWriteUserRepository>();
            var mockReadRepo = new Mock<IReadUserRepository>();
            var mockCreateToken = new Mock<ICreateToken>();

            LoginCommand command = new LoginCommand();
            command.Email = "samuelr@gmail.com";
            command.Password = "senha123";

            CreateUserCommand createCommand = new CreateUserCommand();
            createCommand.Name = "Samuel Ribeiro";
            createCommand.Email = "samuelr@gmail.com";
            createCommand.Password = "senha123";
            createCommand.PasswordConfirm = "senha123";
            createCommand.BornDate = DateOnly.FromDateTime(DateTime.Now).AddYears(-20);

            Models.User user = new Models.User(createCommand);
            user.Id = 1;
            mockReadRepo
                .Setup(r => r.GetUserByEmail(command.Email))
                .Returns(user);

            var handler = new LoginHandler(
                mockWriteRepo.Object,
                mockReadRepo.Object,
                mockCreateToken.Object
            );

            // Act
            Result result = (Result)handler.Handle(command);
            var json = JsonSerializer.Serialize(result.Data);
            var obj = JsonSerializer.Deserialize<Dictionary<string, object>>(json);

            // Assert
            Assert.Equal(200, result.ResultCode);
            Assert.Equal("Samuel Ribeiro", obj["name"].ToString());
        }
    }
}
