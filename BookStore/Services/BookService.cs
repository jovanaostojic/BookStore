using AutoMapper;
using BookStore.Interfaces.IRepositories;
using BookStore.Interfaces.IServices;
using BookStore.Models;
using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;
using System.Net;
using System.Web.Http;

namespace BookStore.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BookService(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        public IEnumerable<BookDto> GetAll()
        {
            try
            {
                var books = _bookRepository.ReadAll();
                IEnumerable<BookDto> booksDto = _mapper.Map<IEnumerable<BookDto>>(books);
                return booksDto;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        public BookDto Get(Guid id)
        {
            try
            {
                var book = _bookRepository.Read(id);
                BookDto bookDto = _mapper.Map<BookDto>(book);
                return bookDto;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No book with ID = " + id),
                    ReasonPhrase = "Book ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Post(BookCreateDto bookCreateDto)
        {
            try
            {
                Book book = _mapper.Map<Book>(bookCreateDto);
                _bookRepository.Create(book);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Put(BookUpdateDto bookUpdateDto)
        {
            try
            {
                Book book = _mapper.Map<Book>(bookUpdateDto);
                _bookRepository.Update(book);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Delete(Guid id)
        {
            try
            {
                var book = _bookRepository.Read(id);
                _bookRepository.Delete(book);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
