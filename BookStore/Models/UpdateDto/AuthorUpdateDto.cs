namespace BookStore.Models.UpdateDto
{
    public class AuthorUpdateDto
    {
        public Guid AuthorId { get; set; }
        public string AuthorFirstName { get; set; } = string.Empty;
        public string AuthorLastName { get; set; } = string.Empty;
    }
}
