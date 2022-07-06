using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;

namespace BookStore.Interfaces.IServices
{
    public interface IAuthorService
    {
        public IEnumerable<AuthorDto> GetAll();
        public AuthorDto Get(Guid id);
        public void Post(AuthorCreateDto authorCreateDto);
        public void Put(AuthorUpdateDto authorUdateDto);
        public void Delete(Guid id);
    }
}
