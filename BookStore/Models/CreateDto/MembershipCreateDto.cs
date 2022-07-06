namespace BookStore.Models.CreateDto
{
    public class MembershipCreateDto
    {
        public DateTime? PurchaseDate { get; set; }
        public Guid UserId { get; set; }
        public Guid MembershipTypeId { get; set; }
        public string? MembershipPaymentStatus { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}
