namespace BookStore.Models.UpdateDto
{
    public class BookUpdateDto
    {
        public Guid BookId { get; set; }
        public string Title { get; set; } = string.Empty;
        public Guid GenreId { get; set; }
        public Guid AuthorId { get; set; }
        public Guid UserId { get; set; }
    }
}
