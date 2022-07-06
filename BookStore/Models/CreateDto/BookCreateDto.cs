namespace BookStore.Models.CreateDto
{
    public class BookCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public Guid GenreId { get; set; }
        public Guid AuthorId { get; set; }
        public Guid UserId { get; set; }
    }
}
