using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    [Table("Countries")]
    public class Country
    {
        public Guid CountryId { get; set; } 
        public string CountryName { get; set; } = string.Empty;
    }
}
