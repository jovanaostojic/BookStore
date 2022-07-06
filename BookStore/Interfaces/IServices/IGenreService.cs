using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;

namespace BookStore.Interfaces.IServices
{
    public interface IGenreService
    {
        public IEnumerable<GenreDto> GetAll();
        public GenreDto Get(Guid id);
        public void Post(GenreCreateDto genre);
        public void Put(GenreUpdateDto genre);
        public void Delete(Guid id);
    }
}
