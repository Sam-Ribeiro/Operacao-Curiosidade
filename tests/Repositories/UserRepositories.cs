using Moq;
using server.Application.Features.Users.Commands.CreateUser;
using server.Infrastructure.Data;
using server.Infrastructure.Repositories;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tests.Repositories
{
    public class UserRepositories
    {
        //public readonly new Mock<IWriteUserRepository> _mockWriteRepo;
        public readonly new Mock<IReadUserRepository> _mockReadRepo;
        public readonly new Mock<InMemoryContext> _mockContext;
        public readonly new Mock<IWriteUserRepository> _mockWriteRepo;
        public UserRepositories()
        {
            _mockContext = new Mock<InMemoryContext>();
            _mockWriteRepo = new Mock<IWriteUserRepository>();
            _mockReadRepo = new Mock<IReadUserRepository>();
        }
    }
}

