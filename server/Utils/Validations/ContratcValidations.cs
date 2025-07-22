using server.Utils.Exceptions;
using server.Utils.Validations.Interfaces;

namespace server.Domains.Validations
{
    public partial class ContratcValidations<T> where T : IContract
    {
        private List<Notification> notifications;

        public ContratcValidations() { 
            notifications = new List<Notification>();
        }

        public List<Notification> GetNotifications() {
            return notifications;
        }
        public IReadOnlyCollection<Notification> Notifications => notifications;

        public void AddNotification(Notification notification) { 
            notifications.Add(notification);
        }

        public bool IsValid() { 
            return notifications.Count == 0 ? true : false;
        }
        
    }
}
