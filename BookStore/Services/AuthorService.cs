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
    public class AuthorService : IAuthorService
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;

        public AuthorService(IAuthorRepository authorRepository, IMapper mapper)
        {
            _authorRepository = authorRepository;
            _mapper = mapper;
        }

        public IEnumerable<AuthorDto> GetAll()
        {
            try
            {
                var authors = _authorRepository.ReadAll();
                IEnumerable<AuthorDto> authorsDto = _mapper.Map<IEnumerable<AuthorDto>>(authors);
                return authorsDto;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        public AuthorDto Get(Guid id)
        {

            try
            {
                var author = _authorRepository.Read(id);
                AuthorDto authorDto = _mapper.Map<AuthorDto>(author);
                return authorDto;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No author with ID = " + id),
                    ReasonPhrase = "Author ID Not Found"
                };
                throw new HttpResponseException(resp);
            }

        }
        public void Post(AuthorCreateDto authorCreateDto)
        {
            try
            {
                Author author = _mapper.Map<Author>(authorCreateDto);
                _authorRepository.Create(author);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Put(AuthorUpdateDto authorUpdateDto)
        {
            try
            {
                Author author = _mapper.Map<Author>(authorUpdateDto);
                _authorRepository.Update(author);
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
                var author = _authorRepository.Read(id);
                _authorRepository.Delete(author);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            
        }
    }
}
