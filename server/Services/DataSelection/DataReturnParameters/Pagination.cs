using server.Models;

namespace server.Services.DataSelection.DataReturnParameters
{
    public static class Pagination
    {
        public static List<Person> SlicePersons(List<Person> list, int page)
        {
            if (page > 0)
            {
                var itensPerPage = 10;
                var slicedList = new List<Person>();
                slicedList = list.Skip((page - 1) * itensPerPage).Take(itensPerPage).ToList();
                return slicedList;
            }
            else
            {
                return list;
            }
        }

        public static List<Log> SliceLogs(List<Log> list, int page)
        {
            if (page > 0)
            {
                var itensPerPage = 10;
                var slicedList = new List<Log>();
                slicedList = list.Skip((page - 1) * itensPerPage).Take(itensPerPage).ToList();
                return slicedList;
            }
            else 
            { 
                return list;
            }
        }
    }
}
