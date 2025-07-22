using server.Application.Results;

namespace server.Application.Features.Interfaces
{
    public interface IQueryHandler<in T> where T : IQueryBase
    {
        IResultBase Handle(T query);
    }
}
