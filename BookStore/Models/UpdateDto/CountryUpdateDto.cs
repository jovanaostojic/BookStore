namespace BookStore.Models.UpdateDto
{
    public class CountryUpdateDto
    {
        public Guid CountryId { get; set; }
        public string CountryName { get; set; } = string.Empty;
    }
}
