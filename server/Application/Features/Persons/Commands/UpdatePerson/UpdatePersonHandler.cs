using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.VisualBasic;
using server.Application.Commands.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using System.Net;
using System.Xml.Linq;

namespace server.Application.Features.Persons.Commands.UpdatePerson
{
    public class UpdatePersonHandler : IHandlerBase<UpdatePersonCommand>
    {
        private readonly IWritePerson _writeRepository;
        private readonly IReadPerson _readRepository;
        public UpdatePersonHandler(IWritePerson writeRepository, IReadPerson readRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
        }
        public IResultBase Handle(UpdatePersonCommand command)
        {
            Result result;
            try {
                var person = _readRepository.GetPersonById(command.Id);
                if (person == null)
                {
                    result = new Result(400, "Erro ao editar pessoa: pessoa não encontrada", false);
                    return result;
                }
                else {
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
                    _writeRepository.UpdatePerson(person);
                    result = new Result(200, "Pessoa editada com sucesso!", true);
                    return result;
                }
            } 
            catch (Exception ex) {
                result = new Result(500, $"Erro interno ao editar pessoa: {ex.Message}");
                return result;
            }
        }
    }
}
