using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;

namespace server.Application.Features.Pages.Queries.GetPersonsPages
{
    public class GetPersonsPagesHandler : IQueryHandler<GetPersonsPagesQuery>
    {
        private readonly IReadPerson _personRepository;
        public GetPersonsPagesHandler(IReadPerson personRepository)
        {
            _personRepository = personRepository;
        }
        public IResultBase Handle(GetPersonsPagesQuery query)
        {
            Result result;
            try 
            {
                result = new Result(200, "", true);
                int pages = (int)Math.Ceiling(_personRepository.GetPersonsCount() / (double)query.PageSize);
                result.SetData(pages);
                return result;
            } 
            catch (Exception ex) 
            {
                result = new Result(500, $"Erro ao retornar total de páginas da lista de pessoas: {ex.Message}", false);
                return result;
            }
        }
    }
}
