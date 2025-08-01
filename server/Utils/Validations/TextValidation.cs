using server.Utils.Exceptions;

namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsTextValid(string text, string message, string property)
        {
            if (text != null)
            {
                if (text.Length > 400)
                {
                    AddNotification(new Notification(message, property));
                }
            }
            return this;
        }
    }
}
