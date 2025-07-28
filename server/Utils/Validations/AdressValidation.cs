using server.Utils.Exceptions;

namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsAdressValid(string addres, string message, string property)
        {
            if (addres.Length <=0 || addres.Length > 400)
            {
                AddNotification(new Notification(message, property));
            }
            return this;
        }
    }
}
