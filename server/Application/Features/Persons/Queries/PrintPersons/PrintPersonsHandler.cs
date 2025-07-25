using server.Application.DTOs.Mapping;
using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.DataSelection;

namespace server.Application.Features.Persons.Queries.PrintPersons
{
    public class PrintPersonsHandler : IQueryHandler<PrintPersonsQuery>
    {
        private readonly IReadPerson _readRepository;

        public PrintPersonsHandler(IReadPerson readRepository)
        {
            _readRepository = readRepository;
        }
        public IResultBase Handle(PrintPersonsQuery query)
        {
            Result result;
            try
            {
                var persons = _readRepository.GetAllPersons();
                if (persons.Count() <= 0)
                {
                    result = new Result(400, "Nenhuma pessoa cadastrada", false);
                }
                else
                {
                    var data = DataSelect.SelectPersons(persons, query.Filter, -1, query.Order);
                    result = new Result(200, "Pessoas carregadas", true);
                    result.SetData(PersonListMap.MapList(data));
                }
                return result;
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro no servidor ao imprimir pessoas: {ex.Message}", false);
                return result;
            }
        }
    }
}
