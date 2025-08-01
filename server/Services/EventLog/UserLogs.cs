using server.Application.DTOs;
using server.Models;

namespace server.Services.EventLog
{
    public static class UserLogs
    {
        public static Log RegisterLog(string email, string username)
        {
            string message = $"Se cadastrou usando o email: {email}.";
            Log log = new Log(message, username);
            return log;
        }
        public static Log UpdateUserLog(User user, User updatedUser)
        {
            string message = "Fez alterações em sua conta:";
            bool change = false;
            if (user.Name != updatedUser.Name)
            {
                message = message + $" Nome alterado de {user.Name} para {updatedUser.Name}.";
                change = true;
            }
            if (user.Email != updatedUser.Email)
            {
                message = message + $" Email alterado de {user.Email} para {updatedUser.Email}.";
                change = true;
            }
            if (user.BornDate != updatedUser.BornDate)
            {
                message = message + $" Data de nascimento alterada.";
                change = true;
            }
            if (user.PasswordHash != updatedUser.PasswordHash)
            {
                message = message + $" Senha alterada.";
                change = true;
            }
            if (change)
            {
                Log log = new Log(message, user.Name);
                return log;
            }
            else
            {
                return null;
            }
        }
    }
}
