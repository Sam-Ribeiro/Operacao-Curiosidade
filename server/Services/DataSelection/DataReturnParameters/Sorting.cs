using server.Models;

namespace server.Services.DataSelection.DataReturnParameters
{
    public static class Sorting
    {
        public static List<Person> SortPersons(List<Person> list, int order)
        {
            List<Person> orderedList = new List<Person>();
            switch (order) { 
                case 0:
                    orderedList = list.OrderBy(person => person.Name).ToList();
                    return orderedList;
                case 1:
                    orderedList = list.OrderByDescending(person => person.Name).ToList();
                    return orderedList;
                case 2:
                    orderedList = list.OrderBy(person => person.Status).ToList();
                    return orderedList;
                case 3:
                    orderedList = list.OrderByDescending(person => person.Status).ToList();
                    return orderedList;
                case 4:
                    orderedList = list.OrderBy(person => person.Email).ToList();
                    return orderedList;
                case 5:
                    orderedList = list.OrderByDescending(person => person.Email).ToList();
                    return orderedList;
                case 6:
                    orderedList = list.OrderBy(person => person.RegistrationDate).ToList();
                    return orderedList;
                case 7:
                    orderedList = list.OrderByDescending(person => person.RegistrationDate).ToList();
                    return orderedList;
                default:
                    return list;
            }
        }

        public static List<Log> SortLogs(List<Log> list, int order)
        {
            List<Log> orderedList = new List<Log>();
            switch (order)
            {
                case 0:
                    orderedList = list.OrderBy(log => log.Username).ToList();
                    return orderedList;
                case 1:
                    orderedList = list.OrderByDescending(log => log.Username).ToList();
                    return orderedList;
                case 2:
                    orderedList = list.OrderBy(log => log.Message).ToList();
                    return orderedList;
                case 3:
                    orderedList = list.OrderByDescending(log => log.Message).ToList();
                    return orderedList;
                case 4:
                    orderedList = list.OrderBy(log => log.EventDate).ToList();
                    return orderedList;
                case 5:
                    orderedList = list.OrderByDescending(log => log.EventDate).ToList();
                    return orderedList;
                default:
                    return list;
            }
        }
    }
}
