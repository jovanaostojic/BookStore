using BookStore.Models;

namespace BookStore.Interfaces.IRepositories
{
    public interface IRoleRepository
    {
        //proveri jos sta ti treba tu
        public IEnumerable<Role> ReadAll();
        public Role Read(Guid id);
        public void Create(Role role);
        public void Update(Role role);
        public void Delete(Role role);
    }
}
