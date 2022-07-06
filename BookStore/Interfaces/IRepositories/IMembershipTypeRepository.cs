using BookStore.Models;

namespace BookStore.Interfaces.IRepositories
{
    public interface IMembershipTypeRepository
    {
        public IEnumerable<MembershipType> ReadAll();
        public MembershipType Read(Guid id);
        public void Create(MembershipType membershipType);
        public void Update(MembershipType membershipType);
        public void Delete(MembershipType membershipType);
    }
}
