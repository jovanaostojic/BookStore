using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;

namespace BookStore.Interfaces.IServices
{
    public interface IBookService
    {
        public IEnumerable<BookDto> GetAll();
        public BookDto Get(Guid id);
        public void Post(BookCreateDto book);
        public void Put(BookUpdateDto book);
        public void Delete(Guid id);
    }
}
