namespace BookStore.Models.Dto
{
    public class MembershipTypeDto
    {
        public Guid MembershipTypeId { get; set; }
        public string MembershipName { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int MembershipPrice { get; set; }
        public string MembershipPriceId { get; set; }
    }
}
