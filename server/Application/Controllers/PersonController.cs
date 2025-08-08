using Microsoft.AspNetCore.Mvc;
using server.Application.Controllers.HandlerContainers;
using server.Application.Features.Persons.Commands.CreatePerson;
using server.Application.Features.Persons.Commands.DeletePerson;
using server.Application.Features.Persons.Commands.RestorePerson;
using server.Application.Features.Persons.Commands.UpdatePerson;
using server.Application.Features.Persons.Queries.GetDeletedPersons;
using server.Application.Features.Persons.Queries.GetPersonData;
using server.Application.Features.Persons.Queries.GetPersons;
using server.Application.Results;

namespace server.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly PersonServices _services;
        public PersonController(PersonServices services) 
        {
            _services = services;
        }

        [HttpPost("create")]
        public IResultBase CreatePerson([FromBody]CreatePersonCommand command) {
            command.Token = Request.Headers["Authorization"].ToString();
            return _services.Create.Handle(command);
        }

        [HttpDelete("delete")]
        public IResultBase DeletePerson(DeletePersonCommand command){
            command.Token = Request.Headers["Authorization"].ToString();
            return _services.Delete.Handle(command);
        }

        [HttpPost("restore")]
        public IResultBase RestorePerson(RestorePersonCommand command) {
            command.Token = Request.Headers["Authorization"].ToString();
            return _services.Restore.Handle(command);
        }

        [HttpPut("update")]
        public IResultBase UpdatePerson(UpdatePersonCommand command){
            command.Token = Request.Headers["Authorization"].ToString();
            return _services.Update.Handle(command);
        }

        [HttpGet("getPersons")]
        public IResultBase GetPersons([FromQuery] GetPersonsQuery query) {
            query.Token = Request.Headers["Authorization"].ToString();
            return _services.QueryPersons.Handle(query);
        }

        [HttpGet("getDeletedPersons")]
        public IResultBase GetDeletedPersons([FromQuery] GetDeletedPersonsQuery query)
        {
            query.Token = Request.Headers["Authorization"].ToString();
            return _services.QueryDeleted.Handle(query);
        }

        [HttpGet("getPersonData/{id}")]
        public IResultBase GetPersonData([FromRoute]int id) 
        {
            GetPersonDataQuery query = new GetPersonDataQuery() { Id = id };
            query.Token = Request.Headers["Authorization"].ToString();
            return _services.QueryPersonData.Handle(query);
        }
    }
}
