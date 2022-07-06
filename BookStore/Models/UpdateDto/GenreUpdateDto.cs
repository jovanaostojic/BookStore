namespace BookStore.Models.UpdateDto
{
    public class GenreUpdateDto
    {
        public Guid GenreId { get; set; }
        public string GenreName { get; set; } = string.Empty;
    }
}
