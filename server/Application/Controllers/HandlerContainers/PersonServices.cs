using server.Application.Commands.Interfaces;
using server.Application.Features.Interfaces;
using server.Application.Features.Persons.Commands.CreatePerson;
using server.Application.Features.Persons.Commands.DeletePerson;
using server.Application.Features.Persons.Commands.RestorePerson;
using server.Application.Features.Persons.Commands.UpdatePerson;
using server.Application.Features.Persons.Queries.GetDeletedPersons;
using server.Application.Features.Persons.Queries.GetPersonData;
using server.Application.Features.Persons.Queries.GetPersons;

namespace server.Application.Controllers.HandlerContainers
{
    public class PersonServices
    {
        public IHandlerBase<CreatePersonCommand> Create { get; }
        public IHandlerBase<DeletePersonCommand> Delete { get; }
        public IHandlerBase<RestorePersonCommand> Restore { get; }
        public IHandlerBase<UpdatePersonCommand> Update { get; }
        public IQueryHandler<GetPersonsQuery> QueryPersons { get; }
        public IQueryHandler<GetDeletedPersonsQuery> QueryDeleted { get; }
        public IQueryHandler<GetPersonDataQuery> QueryPersonData { get; }

        public PersonServices(
            IHandlerBase<CreatePersonCommand> create,
            IHandlerBase<DeletePersonCommand> delete,
            IHandlerBase<RestorePersonCommand> restore,
            IHandlerBase<UpdatePersonCommand> update,
            IQueryHandler<GetPersonsQuery> queryPersons,
            IQueryHandler<GetDeletedPersonsQuery> queryDeleted,
            IQueryHandler<GetPersonDataQuery> queryPersonData)
        {
            Create = create;
            Delete = delete;
            Restore = restore;
            Update = update;
            QueryPersons = queryPersons;
            QueryDeleted = queryDeleted;
            QueryPersonData = queryPersonData;
        }
    }
}
