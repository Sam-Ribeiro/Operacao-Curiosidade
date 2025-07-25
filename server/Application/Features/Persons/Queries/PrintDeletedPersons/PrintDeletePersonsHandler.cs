using server.Application.DTOs.Mapping;
using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.DataSelection;

namespace server.Application.Features.Persons.Queries.PrintDeletedPersons
{
    public class PrintDeletePersonsHandler : IQueryHandler<PrintDeletePersonsQuery>
    {
        private readonly IReadPerson _readRepository;

        public PrintDeletePersonsHandler(IReadPerson readRepository)
        {
            _readRepository = readRepository;
        }

        public IResultBase Handle(PrintDeletePersonsQuery query)
        {
            Result result;
            try
            {
                var persons = _readRepository.GetDeletedPersons();
                if (persons.Count() <= 0)
                {
                    result = new Result(400, "Nenhuma pessoa deletada foi encontrada", false);
                }
                else
                {
                    var data = DataSelect.SelectPersons(persons, query.Filter, -1, query.Order);
                    result = new Result(200, "Pessoas deletadas carregadas", true);
                    result.SetData(PersonListMap.MapList(data));
                }
                return result;
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro interno ao tentar imprimir pessoas deletadas: {ex.Message}", false);
                return result;
            }
        }
    }
}
