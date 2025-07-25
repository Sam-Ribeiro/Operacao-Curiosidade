using server.Models;
using server.Services.DataSelection.DataReturnParameters;

namespace server.Services.DataSelection
{
    public static class DataSelect
    {
        public static List<Person> SelectPersons(List<Person> persons,string filter, int page, int order) { 
            List<Person> result = new List<Person>();
            result = Filtering.FilterPersons(persons, filter);
            result = Sorting.SortPersons(result, order);
            result = Pagination.SlicePersons(result, page);
            return result;
        }

        public static List<Log> SelectLogs(List<Log> logs, string filter, int page, int order)
        {
            List<Log> result = new List<Log>();
            result = Filtering.FilterLogs(logs, filter);
            result = Sorting.SortLogs(result, order);
            result = Pagination.SliceLogs(result, page);
            return result;
        }
    }
}
