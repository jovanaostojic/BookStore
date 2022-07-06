namespace BookStore.Models.Dto
{
    public class BookDto
    {
        public Guid BookId { get; set; }
        public string Title { get; set; } = string.Empty;
        public Genre Genre { get; set; } = null!;
        public Author Author { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
