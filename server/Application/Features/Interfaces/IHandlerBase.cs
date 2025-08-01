using server.Application.Results;

namespace server.Application.Commands.Interfaces
{
    public interface IHandlerBase<in T> where T : ICommandBase
    {
        IResultBase Handle(T command);
    }
}