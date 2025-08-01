using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;
using server.Services.DataSelection;

namespace server.Application.Features.Pages.Queries.GetDeletedPersonsPages
{
    public class GetDeletedPersonsPagesHandler : IQueryHandler<GetDeletedPersonsPagesQuery>
    {
        private readonly IReadPerson _personRepository;
        public GetDeletedPersonsPagesHandler(IReadPerson personRepository)
        {
            _personRepository = personRepository;
        }
        public IResultBase Handle(GetDeletedPersonsPagesQuery query)
        {
            Result result;
            try
            {
                result = new Result(200, "", true);
                var deletedPersons = DataSelect.SelectPersons(_personRepository.GetDeletedPersons(),query.Filter,-1,-1,-1);
                int pages = (int)Math.Ceiling(deletedPersons.Count / (double)query.PageSize);
                result.SetData(pages);
                return result;
            }
            catch (Exception ex)
            {
                result = new Result(500, 
                    $"Erro ao retornar total de páginas da lista de pessoas deletadas: {ex.Message}", false);
                return result;
            }
        }
    }
}
