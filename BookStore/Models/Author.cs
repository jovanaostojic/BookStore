using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    [Table("Authors")]
    public class Author
    {
        public Guid AuthorId { get; set; }
        public string AuthorFirstName { get; set; } = string.Empty;
        public string AuthorLastName { get; set; } = string.Empty;
    }
}
