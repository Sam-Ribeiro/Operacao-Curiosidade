using server.Application.DTOs.Mapping;
using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using server.Services.DataSelection;

namespace server.Application.Features.Persons.Queries.GetDeletedPersons
{
    public class GetDeletedPersonsHandler : IQueryHandler<GetDeletedPersonsQuery>
    {
        private readonly IReadPerson _readRepository;

        public GetDeletedPersonsHandler(IReadPerson readRepository)
        {
            _readRepository = readRepository;
        }

        public IResultBase Handle(GetDeletedPersonsQuery query)
        {
            Result result;
            try
            {
                var persons = _readRepository.GetDeletedPersons();
                if (persons.Count()<=0)
                {
                    result = new Result(400, "Nenhuma pessoa deletada foi encontrada", false);
                }
                else
                {
                    var data = DataSelect.SelectPersons(persons, query.Filter, query.Page, query.Order);
                    result = new Result(200, "Pessoas deletadas carregadas", true);
                    result.SetData(PersonListMap.MapList(data));
                }
                return result;
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro interno ao buscar pessoas deletadas: {ex.Message}", false);
                return result;
            }
        }
    }
}
