using server.Application.Features.Users.Commands.UpdateUser;
using server.Domains.Validations;
using server.Utils.Exceptions;
using server.Utils.Validations.Interfaces;

namespace server.Services.Validation
{
    public class UpdateUserValidation : IContract
    {
        private List<Notification> _notifications;
        public IReadOnlyCollection<Notification> Notifications => _notifications;
        protected void SetNotificiationsList(List<Notification> notifications)
        {
            _notifications = notifications;
        }
        public bool Validate(UpdateUserCommand user, List<string> emails)
        {
            var contract = new ContratcValidations<UpdateUserValidation>()
                .IsEmailValid(user.Email, "Email inválido.", "email")
                .IsNameValid(user.Name, "o Nome deve ter mais que 3 caracteres.", "name")
                .IsBornDateValid(user.BornDate, "Data de nascimento inválida", "bornDate")
                .IsEmailUnique(user.Email, "Email inválido.", "email", emails);

            SetNotificiationsList(contract.GetNotifications());
            return contract.IsValid();
        }
    }
}
