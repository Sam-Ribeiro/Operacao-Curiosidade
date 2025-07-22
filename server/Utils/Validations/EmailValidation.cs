using System.Net.Mail;
using server.Utils.Exceptions;



namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsEmailValid(string email, string message, string property) {
            try 
            {
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

