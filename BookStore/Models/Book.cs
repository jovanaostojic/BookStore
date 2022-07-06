using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    [Table("Books")]
    public class Book
    {
        public Guid BookId { get; set; }
        public string Title { get; set; } = string.Empty;
        public Guid GenreId { get; set; }
        public Genre Genre { get; set; } = null!;
        public Guid AuthorId { get; set; }
        public Author Author { get; set; } = null!;
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
