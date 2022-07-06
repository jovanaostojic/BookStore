namespace BookStore.Models.Dto
{
    public class AuthorDto
    {
        public Guid AuthorId { get; set; }
        public string AuthorFirstName { get; set; } = string.Empty;
        public string AuthorLastName { get; set; } = string.Empty;
    }
}
