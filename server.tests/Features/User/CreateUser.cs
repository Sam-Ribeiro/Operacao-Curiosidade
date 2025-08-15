using Moq;
using server.Application.Features.Users.Commands.CreateUser;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;

namespace server.tests.Features.User
{
    public class CreateUser
    {
        [Fact]
        public void RegisterUser_ValidInputs()
        {
            // Arrange
            var mockWriteRepo = new Mock<IWriteUserRepository>();
            var mockReadRepo = new Mock<IReadUserRepository>();

            mockReadRepo
                .Setup(r => r.GetEmails())
                .Returns(new List<string>());

            var handler = new CreateUserHandler(
                mockWriteRepo.Object,
                mockReadRepo.Object
            );

            CreateUserCommand command = new CreateUserCommand();
            command.Name = "Samuel Ribeiro";
            command.Email = "samuelr@gmail.com";
            command.Password = "senha123";
            command.PasswordConfirm = "senha123";
            command.BornDate = DateOnly.FromDateTime(DateTime.Now).AddYears(-20);

            // Act
            Result result = (Result)handler.Handle(command);

            // Assert
            Assert.Equal(201, result.ResultCode);
        }

        [Fact]
        public void RegisterUser_InValidName()
        {
            // Arrange
            var mockWriteRepo = new Mock<IWriteUserRepository>();
            var mockReadRepo = new Mock<IReadUserRepository>();

            mockReadRepo
                .Setup(r => r.GetEmails())
                .Returns(new List<string>());

            var handler = new CreateUserHandler(
                mockWriteRepo.Object,
                mockReadRepo.Object
            );

            CreateUserCommand command = new CreateUserCommand();
            command.Name = "S@muel_Ribeiro 51 ";
            command.Email = "samuelr@gmail.com";
            command.Password = "senha123";
            command.PasswordConfirm = "senha123";
            command.BornDate = DateOnly.FromDateTime(DateTime.Now).AddYears(-20);

            // Act
            Result result = (Result)handler.Handle(command);

            // Assert
            Assert.Equal(400, result.ResultCode);
            Assert.True(result.Notifications.Any());
            Assert.Equal("name", result.Notifications.First().PropertyName);
        }

        [Fact]
        public void RegisterUser_InValidEmail()
        {
            // Arrange
            var mockWriteRepo = new Mock<IWriteUserRepository>();
            var mockReadRepo = new Mock<IReadUserRepository>();

            mockReadRepo
                .Setup(r => r.GetEmails())
                .Returns(new List<string>());

            var handler = new CreateUserHandler(
                mockWriteRepo.Object,
                mockReadRepo.Object
            );

            CreateUserCommand command = new CreateUserCommand();
            command.Name = "Samuel Ribeiro";
            command.Email = "samuelr.gmail.com";
            command.Password = "senha123";
            command.PasswordConfirm = "senha123";
            command.BornDate = DateOnly.FromDateTime(DateTime.Now).AddYears(-20);

            // Act
            Result result = (Result)handler.Handle(command);

            // Assert
            Assert.Equal(400, result.ResultCode);
            Assert.True(result.Notifications.Any());
            Assert.Equal("email", result.Notifications.First().PropertyName);
        }

        [Fact]
        public void RegisterUser_InValidEmail_NotUnique()
        {
            // Arrange
            var mockWriteRepo = new Mock<IWriteUserRepository>();
            var mockReadRepo = new Mock<IReadUserRepository>();

            mockReadRepo
                .Setup(r => r.GetEmails())
                .Returns(new List<string>(){"samuelr@gmail.com"});

            var handler = new CreateUserHandler(
                mockWriteRepo.Object,
                mockReadRepo.Object
            );

            CreateUserCommand command = new CreateUserCommand();
            command.Name = "Samuel Ribeiro";
            command.Email = "samuelr@gmail.com";
            command.Password = "senha123";
            command.PasswordConfirm = "senha123";
            command.BornDate = DateOnly.FromDateTime(DateTime.Now).AddYears(-20);

            // Act
            Result result = (Result)handler.Handle(command);

            // Assert
            Assert.Equal(400, result.ResultCode);
            Assert.True(result.Notifications.Any());
            Assert.Equal("email",result.Notifications.First().PropertyName);
        }
    }
}
