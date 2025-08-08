using server.Utils.Exceptions;

namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsPasswordValid(string password, string message, string property)
        {
            if (password == null || password.Length <= 6)
            {
                AddNotification(new Notification(message, property));
            }
            if (password.Length > 60)
            {
                AddNotification(new Notification("A senha pode ter até 60 caracteres", property));
            }
            return this;

        }
        public ContratcValidations<T> IsPasswordConfirmed(string password, string passwordConfirm,string message, string property)
        {
            if (password != passwordConfirm)
            {
                AddNotification(new Notification(message, property));
            }
            return this;
        }
    }
}
