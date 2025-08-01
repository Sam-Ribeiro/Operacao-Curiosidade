using server.Models;
using System.Security.Cryptography.Xml;

namespace server.Services.EventLog
{
    public static class PersonLogs
    {
        public static Log CreatePersonLog(string personName, string username) {
            string message = $"Cadastrou a pessoa {personName}";
            Log log = new Log(message, username);
            return log;
        }
        public static Log DeletePersonLog(string personName, string username) {
            string message = $"Deletou a pessoa {personName}";
            Log log = new Log(message, username);
            return log;
        }
        public static Log RestorePersonLog(string personName, string username) {
            string message = $"Restaurou a pessoa {personName}";
            Log log = new Log(message, username);
            return log;
        }
        public static Log UpdatePersonLog(Person person, Person request, string username)
        {

            string message = $"Editou a pessoa {person.Name}";
            bool change = false;
            if (person.Name != request.Name)
            {
                message = message + $", Nome alterado de {person.Name} para {request.Name}";
                change = true;
            }
            if (person.Email != request.Email)
            {
                message = message + $", Email alterado de {person.Email} para {request.Email}";
                change = true;
            }
            if (person.Status != request.Status)
            {
                message = message + $", Status alterado";
                change = true;
            }
            if (person.Age != request.Age) 
            {
                message = message + $", Idade alterada de {person.Age} para {request.Age}";
                change = true;
            }
            if (person.Address != request.Address) 
            {
                message = message + ", Endereço atualizado";
                change = true;
            }
            if (person.Information != request.Information)
            {
                message = message + ", Outras informações de dados e fatos atualizados";
                change = true;
            }
            if (person.Interests != request.Interests)
            {
                message = message + ", Interesses atualizados";
                change = true;
            }
            if (person.Feelings != request.Feelings)
            {
                message = message + ", Sentimentos atualizados";
                change = true;
            }
            if (person.Values != request.Values)
            {
                message = message + ", Valores atualizados";
                change = true;
            }
            message = message + ".";
            if (change)
            {
                Log log = new Log(message, username);
                return log;
            }
            else
            {
                return null;
            }
        }
    }
}