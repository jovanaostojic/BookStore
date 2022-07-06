using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;

namespace BookStore.Interfaces.IServices
{
    public interface ICountryService
    {
        public IEnumerable<CountryDto> GetAll();
        public CountryDto Get(Guid id);
        public void Post(CountryCreateDto country);
        public void Put(CountryUpdateDto country);
        public void Delete(Guid id);
    }
}
