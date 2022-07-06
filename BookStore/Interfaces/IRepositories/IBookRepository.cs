using BookStore.Models;

namespace BookStore.Interfaces.IRepositories
{
    public interface IBookRepository
    {
        public IEnumerable<Book> ReadAll();
        public Book Read(Guid id);
        public void Create(Book book);
        public void Update(Book book);
        public void Delete(Book book);
    }
}
