using server.Utils.Exceptions;
using System.Net.Mail;

namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsEmailValid(string email, string message, string property) {
            try 
            {
                if (email == null || email.Length <= 3 || email.Length > 100)
                {
                    AddNotification(new Notification(message, property));
                }
                MailAddress m = new MailAddress(email);
             
            }catch (FormatException) 
            {
                AddNotification(new Notification(message, property));
            }
            return this;
        }

        public ContratcValidations<T> IsEmailUnique(string email, string message, string property, List<string> emails)
        {
            if (emails.Any(e => e.Equals(email))){
                AddNotification(new Notification(message, property));
                return this;
            }
            return this;
        }
    }
}

