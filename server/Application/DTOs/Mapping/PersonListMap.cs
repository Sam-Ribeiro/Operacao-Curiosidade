using server.Models;

namespace server.Application.DTOs.Mapping
{
    public class PersonListMap
    {
        public static List<PersonInTableDTO> MapList(List<Person> persons) {
            List<PersonInTableDTO> list = new List<PersonInTableDTO>();
            foreach (var person in persons)
            {
                list.Add(new PersonInTableDTO(person));
            }
            return list;
        }
    }
}
