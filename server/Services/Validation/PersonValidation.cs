using server.Application.Features.Persons.Commands.CreatePerson;
using server.Application.Features.Users.Commands.CreateUser;
using server.Domains.Validations;
using server.Utils.Exceptions;
using server.Utils.Validations.Interfaces;

namespace server.Services.Validation
{
    public class PersonValidation : IContract
    {
        private List<Notification> _notifications;
        public IReadOnlyCollection<Notification> Notifications => _notifications;
        protected void SetNotificiationsList(List<Notification> notifications)
        {
            _notifications = notifications;
        }
        public bool Validate(CreatePersonCommand person, List<string> emails)
        {
            var contract = new ContratcValidations<PersonValidation>()
                .IsNameValid(person.Name, "o Nome deve ter mais que 3 caracteres.", "name")
                .IsEmailValid(person.Email, "Email inválido.", "email")
                .IsEmailUnique(person.Email, "Email já cadastrado.", "email", emails)
                .IsAgeValid(person.Age,"Idade Inválida.","age")
                .IsAdressValid(person.Address,"Endereço invalido","adress")
                .IsTextValid(person.Information, "Máximo de caracteres (400) ultrapassado","information")
                .IsTextValid(person.Interests, "Máximo de caracteres (400) ultrapassado", "interests")
                .IsTextValid(person.Feelings, "Máximo de caracteres (400) ultrapassado", "feelings")
                .IsTextValid(person.Values, "Máximo de caracteres (400) ultrapassado", "values");
               
            SetNotificiationsList(contract.GetNotifications());
            return contract.IsValid();
        }
    }
}