using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using server.Services.Authentication;
using server.Services.Validation;
using server.Utils.Exceptions;
using System.Security.Claims;

namespace server.Application.Features.Persons.Commands.UpdatePerson
{
    public class UpdatePersonHandler : IHandlerBase<UpdatePersonCommand>
    {
        private readonly IWritePerson _writeRepository;
        private readonly IReadPerson _readRepository;
        private readonly PersonValidation validation = new PersonValidation();
        public UpdatePersonHandler(IWritePerson writeRepository, IReadPerson readRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
        }
        public IResultBase Handle(UpdatePersonCommand command)
        {
            Result result;
            try {
                var user = ReadToken.ValidateToken(command.Token);
                if (user == null)
                {
                    result = new Result(401, "Erro ao validar token", false);
                    return result;
                }
                Person person = new Person(_readRepository.GetPersonById(command.Id));
                if (person == null)
                {
                    result = new Result(404, "Erro ao editar pessoa: pessoa não encontrada", false);
                    return result;
                }
                else {
                    var oldEmail = person.Email;
                    person.Name = command.Name;
                    person.Email = command.Email;
                    person.Status = command.Status;
                    person.Age = command.Age;
                    person.Address = command.Address;
                    person.Information = command.Information;
                    person.Interests = command.Interests;
                    person.Feelings = command.Feelings;
                    person.Values = command.Values;
                    person.RegistrationDate = DateTime.UtcNow;
                    if (validation.Validate(person, _readRepository.GetEmails(oldEmail)))
                    {
                        int userId = Int32.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                        _writeRepository.UpdatePerson(person,userId);
                        result = new Result(200, "Pessoa editada com sucesso!", true);
                        return result;
                    }
                    else
                    {
                        result = new Result(400, "Erro ao editar pessoa, um ou mais campos não válidos", false);
                        result.SetNotifications(new List<Notification>(validation.Notifications));
                        return result;
                    }
                }
            } 
            catch (Exception ex) {
                result = new Result(500, $"Erro interno ao editar pessoa: {ex.Message}",false);
                return result;
            }
        }
    }
}
