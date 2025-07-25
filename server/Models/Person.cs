using server.Application.Features.Persons.Commands.CreatePerson;
using server.Services.DataSelection.DataReturnParameters;

namespace server.Models
{
    public class Person
    {
        public Person()
        {
        }

        public Person(Person command)
        {
            Id = command.Id;
            Name = command.Name;
            Email = command.Email;
            Status = command.Status;
            Age = command.Age;
            Address = command.Address;
            Information = command.Information;
            Interests = command.Interests;
            Feelings = command.Feelings;
            Values = command.Values;
            RegistrationDate = DateTime.UtcNow;
            Removed = command.Removed;
        }

        public Person(CreatePersonCommand command) 
        {
            Name = command.Name;
            Email = command.Email;
            Status = command.Status;
            Age = command.Age;
            Address = command.Address;
            Information = command.Information;
            Interests = command.Interests;
            Feelings = command.Feelings;
            Values = command.Values;
            RegistrationDate = DateTime.UtcNow;
            Removed = false;
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public bool Status { get; set; }
        public int Age { get; set; }
        public string? Address { get; set; }
        public string? Information { get; set; }
        public string? Interests { get; set; }
        public string? Feelings { get; set; }
        public string? Values { get; set; }
        public DateTime RegistrationDate { get; set; }
        public bool Removed { get; set; } = false;
    }
}