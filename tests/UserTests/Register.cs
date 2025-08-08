
using server.Application.Features.Users.Commands.CreateUser;
using server.Application.Results;
using server.Models;
using tests.Repositories;

namespace tests.UserTests
{
    public class Register : UserRepositories
    {
        [Fact]
        public void registerHandler_ValidUser()
        {
            var handler = new CreateUserHandler(_mockWriteRepo.Object, _mockReadRepo.Object);
            var command = new CreateUserCommand
            {
                Name = "João Carlos",
                Email = "joaocarlos@email.com",
                Password = "1234567",
                PasswordConfirm = "1234567",
                BornDate = DateOnly.FromDateTime(DateTime.Now).AddYears(-20),
            };
            Result result = (Result)handler.Handle(command);
            Assert.Equal(201, result.ResultCode);
        }
        [Fact]
        public void registerHandler_WrongPassword()
        {
            var handler = new CreateUserHandler(_mockWriteRepo.Object, _mockReadRepo.Object);
            var command = new CreateUserCommand
            {
                Name = "João Carlos",
                Email = "joaocarlos@email.com",
                Password = "123",
                PasswordConfirm = "123",
                BornDate = DateOnly.FromDateTime(DateTime.Now).AddYears(-20),
            };
            Result result = (Result)handler.Handle(command);
            Assert.Equal(400, result.ResultCode);
            Assert.Equal("password", result.Notifications.FirstOrDefault().PropertyName);
        }

        [Fact]
        public void registerHandler_InvalidEmail()
        {
            var handler = new CreateUserHandler(_mockWriteRepo.Object, _mockReadRepo.Object);
            var command = new CreateUserCommand
            {
                Name = "João Carlos",
                Email = "joaocarlos.email.com",
                Password = "12345637",
                PasswordConfirm = "1234567",
                BornDate = DateOnly.FromDateTime(DateTime.Now).AddYears(-20),
            };
            Result result = (Result)handler.Handle(command);
            Assert.Equal(400, result.ResultCode);
        }
        
    }
}