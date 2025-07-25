using server.Utils.Exceptions;
namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {

        public ContratcValidations<T> IsAgeValid(int age, string message, string property)
        {
            if (age <= 0 || age > 120) {
                AddNotification(new Notification(message,property));
            }
            return this;
        }
    }
}
