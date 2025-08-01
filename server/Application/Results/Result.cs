using server.Utils.Exceptions;
namespace server.Application.Results
{
    public class Result : IResultBase
    {
        public Result(int resultCode, string message, bool isOk)
        {
            ResultCode = resultCode;
            Message = message;
            IsOk = isOk;
        }
        public int ResultCode { get; private set; }
        public string Message { get; private set; }
        public bool IsOk { get; private set; }
        public object? Data { get; private set; }
        public List<Notification> Notifications { get; private set; }
        public void SetData(object data)
        {
            Data = data;
        }
        public void SetNotifications(List<Notification> notifications)
        {
            Notifications = notifications;
        }
    }

}
