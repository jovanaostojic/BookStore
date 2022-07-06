using BookStore.Models;

namespace BookStore.Interfaces.IRepositories
{
    public interface ICountryRepository
    {
        public IEnumerable<Country> ReadAll();
        public Country Read(Guid id);
        public void Create(Country country);
        public void Update(Country country);
        public void Delete(Country country);
    }
}
