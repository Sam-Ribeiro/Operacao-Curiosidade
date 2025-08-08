using server.Utils.Exceptions;
using server.Utils.Validations.Interfaces;
using server.Domains.Validations;
using server.Application.Features.Users.Commands.CreateUser;

namespace server.Services.Validation
{
    public class UserValidation : IContract
    {
        private List<Notification> _notifications;
        public IReadOnlyCollection<Notification> Notifications => _notifications;
        protected void SetNotificiationsList(List<Notification> notifications)
        {
            _notifications = notifications;
        }
        public bool Validate(CreateUserCommand user, List<string> emails) {
            var contract = new ContratcValidations<UserValidation>()
                .IsEmailValid(user.Email, "Email inválido.", "email")
                .IsNameValid(user.Name, "O Nome deve ter mais que 3 caracteres.", "name")
                .IsPasswordValid(user.Password, "A Senha deve conter mais que 6 caracteres", "password")
                .IsPasswordConfirmed(user.Password, user.PasswordConfirm, "As senhas não conferem", "passwordConfirm")
                .IsBornDateValid(user.BornDate, "Data de nascimento inválida", "bornDate")
                .IsEmailUnique(user.Email, "Email inválido.", "email", emails);

            SetNotificiationsList(contract.GetNotifications());
            return contract.IsValid();
        }
    }
}
