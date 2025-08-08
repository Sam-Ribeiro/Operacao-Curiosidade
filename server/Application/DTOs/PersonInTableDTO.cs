using server.Models;

namespace server.Application.DTOs
{
    public class PersonInTableDTO
    {
        public PersonInTableDTO(Person person)
        {
            Id = person.Id;
            Name = person.Name;
            Email = person.Email;
            Status = person.Status;
            RegistrationDate = person.RegistrationDate;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}