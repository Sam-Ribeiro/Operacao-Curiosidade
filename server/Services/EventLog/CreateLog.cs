using server.Models;
using System;

namespace server.Services.EventLog
{
    public static class CreateLog
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
        public static Log UpdatePersonLog(Person person, Person request, string username) {

            string message = $"Editou a pessoa {person.Name}, ";
            if (person.Name != request.Name)
            {
                message = message + $"Nome alterado de {person.Name} para {request.Name}, ";
            }
            if (person.Email != request.Email)
            {
                message = message + $"Email alterado de {person.Email} para {request.Email}, ";
            }
            if (person.Status != request.Status)
            {
                message = message + $"Status alterado, ";
            }
            if (person.Age != request.Age) 
            {
                message = message + $"Idade alterada de {person.Age} para {request.Age}, ";
            }
            if (person.Address != request.Address) 
            {
                message = message + "Endereço atualizado, ";
            }
            if (person.Information != request.Information)
            {
                message = message + "Outras informações de dados e fatos atualizados, ";
            }
            if (person.Interests != request.Interests)
            {
                message = message + "Interesses atualizados, ";
            }
            if (person.Feelings != request.Feelings)
            {
                message = message + "Sentimentos atualizados, ";
            }
            if (person.Values != request.Values)
            {
                message = message + "Valores atualizados, ";
            }
            Log log = new Log(message, username);
            return log;
        }
    }
}