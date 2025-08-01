namespace server.Models
{
    public class Log
    {
        public Log()
        {
        }

        public Log(string message, string username)
        {
            Message = message;
            Username = username;
            EventDate = DateTime.UtcNow;
        }

        public int Id { get; set; }
        public string Message { get; set; }
        public string Username { get; set; }
        public DateTime EventDate { get; set; }
    }
}
