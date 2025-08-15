using server.Models;

namespace server.Services.DataSelection.DataReturnParameters
{
    public static class Pagination<T>
    {
        public static List<T> SliceList(List<T> list, int page, int pageSize)
        {
            if (page > 0 && pageSize > 0)
            {
                var slicedList = new List<T>();
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
