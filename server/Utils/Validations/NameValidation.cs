using server.Utils.Exceptions;
using System.Text.RegularExpressions;

namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsNameValid(string name, string message, string property) {
            if (name == null || name.Length <= 3 || name.Length > 60)
            {
                AddNotification(new Notification(message, property));
            }
            else
            {
                string pattern = @"^[\p{L}](?:[\p{L}.,'´~^_\- ]*[\p{L}])?$";
                Match match = Regex.Match(name, pattern);
                if (!match.Success)
                {
                    AddNotification(new Notification("Nome inválido.", property));
                }
            }
            return this;
        }
    }
}
