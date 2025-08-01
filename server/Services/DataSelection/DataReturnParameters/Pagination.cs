using server.Models;

namespace server.Services.DataSelection.DataReturnParameters
{
    public static class Pagination
    {
        public static List<Person> SlicePersons(List<Person> list, int page, int pageSize)
        {
            if (page > 0 && pageSize > 0)
            {
                var slicedList = new List<Person>();
                slicedList = list.Skip((page - 1) * pageSize).Take(pageSize).ToList();
                return slicedList;
            }
            else
            {
                return list;
            }
        }

        public static List<Log> SliceLogs(List<Log> list, int page, int pageSize)
        {
            if (page > 0 && pageSize > 0)
            {
                var slicedList = new List<Log>();
                slicedList = list.Skip((page - 1) * pageSize).Take(pageSize).ToList();
                return slicedList;
            }
            else 
            { 
                return list;
            }
        }
    }
}
