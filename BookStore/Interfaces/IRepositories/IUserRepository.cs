using BookStore.Models;

namespace BookStore.Interfaces.IRepositories
{
    public interface IUserRepository
    {
        public IEnumerable<User> ReadAll();
        public User Read(Guid id);
        public void Create(User user);
        public void Update(User user);
        public void Delete(User user);
    }
}
