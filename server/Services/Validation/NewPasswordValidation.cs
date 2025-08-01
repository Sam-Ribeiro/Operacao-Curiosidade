using server.Application.Features.Users.Commands.UpdatePassword;
using server.Domains.Validations;
using server.Utils.Exceptions;
using server.Utils.Validations.Interfaces;

namespace server.Services.Validation
{
    public class NewPasswordValidation : IContract
    {
        private List<Notification> _notifications;
        public IReadOnlyCollection<Notification> Notifications => _notifications;
        protected void SetNotificiationsList(List<Notification> notifications)
        {
            _notifications = notifications;
        }
        public bool Validate(UpdatePasswordCommand user)
        {
            var contract = new ContratcValidations<NewPasswordValidation>()
                .IsPasswordValid(user.NewPassword, "A Senha deve conter mais que 6 caracteres", "password")
                .IsPasswordConfirmed(user.NewPassword, user.NewPasswordConfirm, "As senhas não conferem", "passwordConfirm");
            SetNotificiationsList(contract.GetNotifications());
            return contract.IsValid();
        }
    }
}
