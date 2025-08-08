using System.Security.Cryptography;

namespace server.Services.Authentication
{
    public static class PasswordGenerator
    {
        public static byte[] CreatePassword(string password, byte[] salt)
        {
            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(32);
            return hash;
        }

        public static byte[] GenerateSalt()
        {
            var salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        public static bool VerifyPassword(string password, byte[] salt, byte[] storedHash)
        {
            var inputHash = CreatePassword(password, salt);
            return CryptographicOperations.FixedTimeEquals(inputHash, storedHash);
        }
    }
}
