using server.Utils.Exceptions;

namespace server.Domains.Validations
{
    public partial class ContratcValidations<T>
    {
        public ContratcValidations<T> IsAdressValid(string addres, string message, string property)
        {
            if (addres.Length <= 0)
            {
                AddNotification(new Notification("Endereço é um campo obrigatório", property));
            }
            if (addres.Length > 400)
            {
                AddNotification(new Notification("Máximo de caracteres (400) ultrapassado", property));
            }
            return this;
        }
    }
}