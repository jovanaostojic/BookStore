namespace BookStore.Models.CreateDto
{
    public class MembershipTypeCreateDto
    {
        public string MembershipName { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int MembershipPrice { get; set; }
        public string MembershipPriceId { get; set; }
    }
}
