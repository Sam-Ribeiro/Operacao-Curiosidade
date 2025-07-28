using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;

namespace server.Application.Features.Persons.Queries.GetPersonsCount
{
    public class GetPersonsCountHandler : IQueryHandler<GetPersonsCountQuery>
    {
        private readonly IReadPerson _personRepostory;

        public GetPersonsCountHandler(IReadPerson personRepostory)
        {
            _personRepostory = personRepostory;
        }
        public IResultBase Handle(GetPersonsCountQuery query)
        {
            Result result;
            try
            {
                int count = _personRepostory.GetPersonsCount();
                result = new Result(200, "", true);
                result.SetData(count);
                return result;
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro ao contar pessoas cadastradas", false);
                return result;
            }
        }
    }
}
