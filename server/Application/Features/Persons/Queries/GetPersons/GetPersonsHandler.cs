using server.Application.DTOs.Mapping;
using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;

namespace server.Application.Features.Persons.Queries.GetPersons
{
    public class GetPersonsHandler : IQueryHandler<GetPersonsQuery>
    {
        private readonly IReadPerson _readRepository;

        public GetPersonsHandler(IReadPerson readRepository)
        {
            _readRepository = readRepository;
        }

        public IResultBase Handle(GetPersonsQuery query)
        {
            Result result;
            try
            {
                var persons = _readRepository.GetAllPersons();
                if (persons == null) {
                    result = new Result(400, "Nenhuma pessoa cadastrada", true);
                }
                else { 
                    result = new Result(200, "Pessoas carreadas", true);
                    result.SetData(PersonListMap.MapList(persons));
                }
                return result;
            }
            catch (Exception ex) {
                result = new Result(500, $"Erro no servidor ao buscar pessoas: {ex.Message}", false);
                return result;
            }
        }
    }
}
