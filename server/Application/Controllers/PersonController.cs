using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Application.Commands.Interfaces;
using server.Application.Features.Persons.Commands.CreatePerson;
using server.Application.Features.Persons.Commands.DeletePerson;
using server.Application.Features.Persons.Commands.RestorePerson;
using server.Application.Features.Persons.Commands.UpdatePerson;
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

        public PersonController(IHandlerBase<CreatePersonCommand> create, IHandlerBase
            <DeletePersonCommand> delete, IHandlerBase<RestorePersonCommand> restore, 
            IHandlerBase<UpdatePersonCommand> update) {
            _create = create;
            _delete = delete;
            _restore = restore;
            _update = update;
        }

        //Command
        [HttpPost("create")]
        public IResultBase CreatePerson(CreatePersonCommand command) { 
            return _create.Handle(command);
        }

        [HttpDelete("delete")]
        public IResultBase DeletePerson(DeletePersonCommand command){
            return _delete.Handle(command);
        }

        [HttpPost("restore")]
        public IResultBase RestorePerson(RestorePersonCommand command) { 
            return _restore.Handle(command);
        }

        [HttpPut("update")]
        public IResultBase UpdatePerson(UpdatePersonCommand command){
            return _update.Handle(command);
        }

        // Query


    }
}
