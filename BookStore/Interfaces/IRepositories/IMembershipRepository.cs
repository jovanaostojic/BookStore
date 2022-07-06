using BookStore.Models;

namespace BookStore.Interfaces.IRepositories
{
    public interface IMembershipRepository
    {
        public IEnumerable<Membership> ReadAll();
        public Membership Read(Guid id);
        public IEnumerable<Membership> ReadByUserId(Guid userId);
        public void Create(Membership membership);
        public void Update(Membership membership);
        public void Delete(Membership membership);
    }
}
