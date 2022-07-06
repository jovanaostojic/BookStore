using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    [Table("Roles")]
    public class Role : IdentityRole<Guid>
    {
        public override Guid Id { get; set; }   
        public override string Name { get; set; } = string.Empty;
    }
}
