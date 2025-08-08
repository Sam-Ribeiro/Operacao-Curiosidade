using server.Utils.Exceptions;
using System.Text.RegularExpressions;

namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsNameValid(string name, string message, string property) {
            if (name == null || name.Length <= 3)
            {
                AddNotification(new Notification("O Nome deve ter mais que 3 caracteres.", property));
            }
            if (name.Length > 80) {
                AddNotification(new Notification("O Nome pode ter até 80 caracteres.", property));
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
