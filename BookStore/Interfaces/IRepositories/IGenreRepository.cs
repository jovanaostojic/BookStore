using BookStore.Models;

namespace BookStore.Interfaces.IRepositories
{
    public interface IGenreRepository
    {
        public IEnumerable<Genre> ReadAll();
        public Genre Read(Guid id);
        public void Create(Genre genre);
        public void Update(Genre genre);
        public void Delete(Genre genre);
    }
}
