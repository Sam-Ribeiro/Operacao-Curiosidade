using server.Models;

namespace server.Application.DTOs
{
    public class EditUserDTO
    {
        public EditUserDTO(User user)
        {
            Name = user.Name;
            Email = user.Email;
            BornDate = user.BornDate;
        }

        public string Name { get; set; }
        public string Email { get; set; }
        public DateOnly BornDate { get; set; }
    }
}
