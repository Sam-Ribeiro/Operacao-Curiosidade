
using Moq;
using server.Application.Features.Users.Commands.Login;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.Authentication;

namespace server.tests.Features.User
{
    public class UpdatePassword
    {
        [Fact]
        public void UpdatePassword_WrongOldPassword()
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
    }
}
