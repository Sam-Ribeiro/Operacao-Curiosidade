using server.Application.DTOs.Mapping;
using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.DataSelection;

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
                if (persons.Count() <= 0)
                {
                    result = new Result(400, "Nenhuma pessoa cadastrada", true);
                }
                else {
                    var data = DataSelect.SelectPersons(persons, query.Filter, query.Page, query.Order, query.PageSize);
                    result = new Result(200, "Pessoas carregadas", true);
                    result.SetData(PersonListMap.MapList(data));
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
