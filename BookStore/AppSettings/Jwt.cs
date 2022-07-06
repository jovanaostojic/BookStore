#nullable disable
namespace BookStore.AppSettings
{
    public class Jwt
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Key { get; set; }
        public int ExpirationInDays { get; set; }
    }
}
