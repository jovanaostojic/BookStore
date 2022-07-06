using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    [Table("Memberships")]
    public class Membership
    {  
        public Guid MembershipId { get; set; } 
        public DateTime? PurchaseDate { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public Guid MembershipTypeId { get; set; }
        public MembershipType MembershipType { get; set; } = null!;
        public string? MembershipPaymentStatus { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}
