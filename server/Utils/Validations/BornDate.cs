using server.Utils.Exceptions;
namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsBornDateValid(DateOnly bornDate, string message, string property)
        {
            DateOnly dateTime = DateOnly.FromDateTime(DateTime.Now);

            if (bornDate > dateTime || bornDate.Year + 120 < dateTime.Year) {
                AddNotification(new Notification(message, property));
            }
            
            return this;
        }
    }
}
