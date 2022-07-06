using BookStore.Models;

namespace BookStore.Interfaces.IRepositories
{ 
    public interface IAuthorRepository
    {
        public IEnumerable<Author> ReadAll();
        public Author Read(Guid id);
        public void Create(Author author);
        public void Update(Author author);
        public void Delete(Author author);
    }
}
