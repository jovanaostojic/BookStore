using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    [Table("Users")]
    public class User : IdentityUser<Guid>
    {
        public override Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public Guid CountryId { get; set; }
        public Country Country { get; set; } = null!;
    }
}
