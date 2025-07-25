using server.Models;

namespace server.Services.DataSelection.DataReturnParameters
{
    public static class Filtering
    {
        public static List<Log> FilterLogs(List<Log> list,string filter) {
            if (filter != null)
            {
                return list.Where(log =>
                log.Message.Contains(filter) ||
                log.Username.Contains(filter))
                    .ToList();
            }
            else { 
                return list;
            }
        }

        public static List<Person> FilterPersons(List<Person> list, string filter)
        {
            if (filter != null)
            {
                return list.Where(person =>
                person.Name.Contains(filter) ||
                person.Email.Contains(filter))
                    .ToList();
            }
            else {  
                return list; 
            }
        }
    }
}
