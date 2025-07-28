using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Application.Commands.Interfaces;
using server.Application.Features.Interfaces;
using server.Application.Features.Persons.Commands.CreatePerson;
using server.Application.Features.Persons.Commands.DeletePerson;
using server.Application.Features.Persons.Commands.RestorePerson;
using server.Application.Features.Persons.Commands.UpdatePerson;
using server.Application.Features.Persons.Queries.GetDeletedPersons;
using server.Application.Features.Persons.Queries.GetInactiveCount;
using server.Application.Features.Persons.Queries.GetLastMonthRecordCount;
using server.Application.Features.Persons.Queries.GetPersonData;
using server.Application.Features.Persons.Queries.GetPersons;
using server.Application.Features.Persons.Queries.GetPersonsCount;
using server.Application.Features.Persons.Queries.PrintDeletedPersons;
using server.Application.Features.Persons.Queries.PrintPersons;
using server.Application.Results;

namespace server.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IHandlerBase<CreatePersonCommand> _create;
        private readonly IHandlerBase<DeletePersonCommand> _delete;
        private readonly IHandlerBase<RestorePersonCommand> _restore;
        private readonly IHandlerBase<UpdatePersonCommand> _update;
        private readonly IQueryHandler<GetPersonsQuery> _queryPersons;
        private readonly IQueryHandler<GetDeletedPersonsQuery> _queryDeleted;
        private readonly IQueryHandler<GetPersonDataQuery> _queryPersonData;
        private readonly IQueryHandler<PrintPersonsQuery> _printPersons;
        private readonly IQueryHandler<PrintDeletePersonsQuery > _printDeleted;
        public PersonController(IHandlerBase<CreatePersonCommand> create, IHandlerBase<DeletePersonCommand> delete, 
            IHandlerBase<RestorePersonCommand> restore,IHandlerBase<UpdatePersonCommand> update, 
            IQueryHandler<GetPersonsQuery> queryPersons,IQueryHandler<GetDeletedPersonsQuery> queryDeleted, 
            IQueryHandler<GetPersonDataQuery> queryPersonData, IQueryHandler<PrintPersonsQuery> printPersons, 
            IQueryHandler<PrintDeletePersonsQuery> printDeleted) 
        {
            _create = create;
            _delete = delete;
            _restore = restore;
            _update = update;
            _queryPersons = queryPersons;
            _queryDeleted = queryDeleted;
            _queryPersonData = queryPersonData;
            _printPersons = printPersons;
            _printDeleted = printDeleted;
        }

        //Command
        [HttpPost("create")]
        public IResultBase CreatePerson([FromBody]CreatePersonCommand command) {
            command.Token = Request.Headers["Authorization"].ToString();
            return _create.Handle(command);
        }

        [HttpDelete("delete")]
        public IResultBase DeletePerson(DeletePersonCommand command){
            command.Token = Request.Headers["Authorization"].ToString();
            return _delete.Handle(command);
        }

        [HttpPost("restore")]
        public IResultBase RestorePerson(RestorePersonCommand command) {
            command.Token = Request.Headers["Authorization"].ToString();
            return _restore.Handle(command);
        }

        [HttpPut("update")]
        public IResultBase UpdatePerson(UpdatePersonCommand command){
            command.Token = Request.Headers["Authorization"].ToString();
            return _update.Handle(command);
        }

        // Query
        [HttpGet("getPersons")]
        public IResultBase GetPersons([FromQuery] GetPersonsQuery query) {
            query.Token = Request.Headers["Authorization"].ToString();
            return _queryPersons.Handle(query);
        }

        [HttpGet("getDeletedPersons")]
        public IResultBase GetDeletedPersons([FromQuery] GetDeletedPersonsQuery query)
        {
            query.Token = Request.Headers["Authorization"].ToString();
            return _queryDeleted.Handle(query);
        }

        [HttpGet("getPersonData/{id}")]
        public IResultBase GetPersonData([FromRoute]int id) 
        {
            GetPersonDataQuery query = new GetPersonDataQuery() { Id = id };
            query.Token = Request.Headers["Authorization"].ToString();
            return _queryPersonData.Handle(query);
        }

        [HttpGet("printPersons")]
        public IResultBase PrintPersons([FromQuery] PrintPersonsQuery query)
        {
            query.Token = Request.Headers["Authorization"].ToString();
            return _printPersons.Handle(query);
        }

        [HttpGet("printDeletedPersons")]
        public IResultBase PrintDeletePersons([FromQuery] PrintDeletePersonsQuery query) 
        {
            query.Token = Request.Headers["Authorization"].ToString();
            return _printDeleted.Handle(query);
        }
    }
}
