using System.Net;

namespace BookStore.Models.Dto
{
    public class ResponseDto
    {
        public HttpStatusCode StatusCode { get; set; }
        public string StatusMesage { get; set; }
        public string? Token { get; set; }
        public IList<string> Roles { get; set; }
        public Guid UserId { get; set; }

        public ResponseDto(HttpStatusCode statusCode, string statusMesage)
        {
            StatusCode = statusCode;
            StatusMesage = statusMesage;
        }

        public ResponseDto(HttpStatusCode statusCode, string statusMesage, string token) : this(statusCode, statusMesage)
        {
            Token = token;
        }

        public ResponseDto(HttpStatusCode statusCode, string statusMesage, string token, IList<string> roles) : this(statusCode, statusMesage, token)
        {
            Roles = roles;
        }

        public ResponseDto(HttpStatusCode statusCode, string statusMesage, string? token, IList<string> roles, Guid userId) : this(statusCode, statusMesage, token, roles)
        {
            UserId = userId;
        }
    }
}
