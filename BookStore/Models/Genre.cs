using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    [Table("Genres")]
    public class Genre
    {
        public Guid GenreId { get; set; }
        public string GenreName { get; set; } = string.Empty;
    }
}
