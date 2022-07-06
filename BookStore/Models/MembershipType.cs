using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    [Table("MembershipTypes")]
    public class MembershipType
    {
        public Guid MembershipTypeId { get; set; }
        public string MembershipName { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int MembershipPrice { get; set; }
        public string MembershipPriceId { get; set; }
    }
}
