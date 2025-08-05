using server.Application.Features.Interfaces;
using server.Application.Results;
using server.Infrastructure.Repositories.Interfaces;

namespace server.Application.Features.Persons.Queries.GetLastMonthRecordCount
{
    public class GetMonthRecordCountHandler : IQueryHandler<GetMonthRecordCountQuery>
    {
        private readonly IReadPerson _personRepostory;

        public GetMonthRecordCountHandler(IReadPerson personRepostory)
        {
            _personRepostory = personRepostory;
        }
        public IResultBase Handle(GetMonthRecordCountQuery query)
        {
            Result result;
            try
            {
                int count = _personRepostory.GetLastMonthRecordCount();
                result = new Result(200, "", true);
                result.SetData(count);
                return result;
            }
            catch (Exception ex)
            {
                result = new Result(500, $"Erro ao contar pessoas cadastradas no ultimo mes {ex.Message}", false);
                return result;
            }
        }
    }
}