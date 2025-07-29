using server.Models;

namespace server.Application.DTOs
{
    public class PersonDTO
    {
        public PersonDTO(Person person)
        {
            Id = person.Id;
            Name = person.Name;
            Email = person.Email;
            Status = person.Status;
            Age = person.Age;
            Address = person.Address;
            Information = person.Information;
            Interests = person.Interests;
            Feelings = person.Feelings;
            Values = person.Values;
            Removed = person.Removed;
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
        public bool Removed { get; set; }
    }
}
