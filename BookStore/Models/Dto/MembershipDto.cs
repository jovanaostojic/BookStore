namespace BookStore.Models.Dto
{
    public class MembershipDto
    {
        public Guid MembershipId { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public User User { get; set; } = null!;
        public MembershipType MembershipType { get; set; } = null!;
        public string? MembershipPaymentStatus { get; set; }
        public DateTime? ExpiryDate { get; set; }

    }
}
