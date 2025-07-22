using server.Utils.Exceptions;

namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsNameValid(string name, string message, string property) {
            if (name == null || name.Length <= 3){
                AddNotification(new Notification(message, property));
            }
            return this;
        }
    }
}
