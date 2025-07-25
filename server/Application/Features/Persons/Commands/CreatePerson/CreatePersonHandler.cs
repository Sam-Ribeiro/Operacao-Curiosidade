using Microsoft.AspNetCore.Authentication;
using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using server.Services.Authentication;
using server.Services.Validation;
using server.Utils.Exceptions;
using System.Security.Claims;

namespace server.Application.Features.Persons.Commands.CreatePerson
{
    public class CreatePersonHandler : IHandlerBase<CreatePersonCommand>
    {
        private readonly IWritePerson _writePerson;
        private readonly IReadPerson _readPerson;
        private readonly PersonValidation validation = new PersonValidation();

        public CreatePersonHandler(IWritePerson writePerson, IReadPerson readPerson)
        {
            _writePerson = writePerson;
            _readPerson = readPerson;
        }

        public IResultBase Handle(CreatePersonCommand command)
        {
            Result result;
            try
            {
                var user = ReadToken.ValidateToken(command.Token);
                if (user == null)
                {
                    result = new Result(401, "Erro ao validar token", false);
                    return result;
                }

                Person person = new Person(command);
                if (validation.Validate(person, _readPerson.GetEmails("")))
                {
                    int userId = Int32.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                    _writePerson.AddPerson(new Person(command),userId);
                    result = new Result(201, "Pessoa cadastrada com sucesso!", true);
                    return result;
                }
                else {
                    result = new Result(400, "Erro ao validar pessoa", false);
                    result.SetNotifications(new List<Notification>(validation.Notifications));
                    return result;
                }

            }
            catch (Exception ex) {
                result = new Result(500, $"Erro interno ao cadastrar pessoa: {ex.Message}", false);
                return result;
            }
        }
    }
}
