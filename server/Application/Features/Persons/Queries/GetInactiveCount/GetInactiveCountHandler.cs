using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;

namespace server.Application.Features.Persons.Queries.GetInactiveCount
{
    public class GetInactiveCountHandler : IQueryHandler<GetInactiveCountQuery>
    {
        private readonly IReadPerson _personRepostory;

        public GetInactiveCountHandler(IReadPerson personRepostory) {
            _personRepostory = personRepostory;
        }
        public IResultBase Handle(GetInactiveCountQuery query)
        {
            Result result;
            try 
            {
                int count = _personRepostory.GetInactiveCount();
                result = new Result(200, "", true);  
                result.SetData(count);
                return result;
            } 
            catch (Exception ex) 
            {
                result = new Result(500, $"Erro ao contar pessoas inativas", false);
                return result;
            }
        }
    }
}