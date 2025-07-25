using server.Application.DTOs;
using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Application.Features.Persons.Queries.GetPersonData
{
    public class GetPersonDataHandler : IQueryHandler<GetPersonDataQuery>
    {
        private readonly IReadPerson _readRepository;

        public GetPersonDataHandler(IReadPerson readRepository)
        {
            _readRepository = readRepository;
        }

        public IResultBase Handle(GetPersonDataQuery query)
        {
            Result result;
            try {
                Person person = _readRepository.GetPersonById(query.Id);
                if (person == null)
                {
                    result = new Result(400, $"Erro ao buscar informações de pessoa:{query.Id} pessoa não existe", false);
                    return result;
                }
                else {
                    result = new Result(200, "Pessoa encontrada", true);
                    result.SetData(new PersonDTO(person));
                    return result;
                }
            }
            catch (Exception ex) {
                result = new Result(500, $"Erro interno ao buscar informações de pessoa: {ex.Message}", false);
                return result;
            }
        }
    }
}
