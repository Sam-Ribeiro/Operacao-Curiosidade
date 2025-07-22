using server.Models;

namespace server.Application.DTOs
{
    public class UserLoggedDTO
    {
        public UserLoggedDTO(User user)
        {
            this.Name = user.Name;
            this.Id = user.Id;
        }
        public string Name { get; set; }
        public int Id { get; set; }
    }
}
