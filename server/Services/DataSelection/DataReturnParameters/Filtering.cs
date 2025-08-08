using server.Models;

namespace server.Services.DataSelection.DataReturnParameters
{
    public static class Filtering
    {
        public static List<Log> FilterLogs(List<Log> list,string filter) {
            if (filter != null)
            {
                filter = filter.ToLower();
                return list.Where(log =>
                    log.Message.ToLower().Contains(filter) ||
                    log.Username.ToLower().Contains(filter))
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
                filter = filter.ToLower();
                return list.Where(person =>
                    person.Name.ToLower().Contains(filter) ||
                    person.Email.ToLower().Contains(filter))
                        .ToList();
            }
            else {  
                return list; 
            }
        }
    }
}
