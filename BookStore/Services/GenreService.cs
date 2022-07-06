using AutoMapper;
using BookStore.Models;
using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;
using BookStore.Interfaces.IRepositories;
using BookStore.Interfaces.IServices;
using System.Net;
using System.Web.Http;

namespace BookStore.Services
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository _genreRepository;
        private readonly IMapper _mapper;

        public GenreService(IGenreRepository genreRepository, IMapper mapper)
        {
            _genreRepository = genreRepository;
            _mapper = mapper;
        }

        public IEnumerable<GenreDto> GetAll()
        {
            try
            {
                var genres = _genreRepository.ReadAll();
                IEnumerable<GenreDto> genresDto = _mapper.Map<IEnumerable<GenreDto>>(genres);
                return genresDto;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        public GenreDto Get(Guid id)
        {
            try
            {
                var genre = _genreRepository.Read(id);
                GenreDto genreDto = _mapper.Map<GenreDto>(genre);
                return genreDto;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No genre with ID = " + id),
                    ReasonPhrase = "Genre ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Post(GenreCreateDto genreCreateDto)
        {
            try
            {
                Genre genre = _mapper.Map<Genre>(genreCreateDto);
                _genreRepository.Create(genre);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Put(GenreUpdateDto genreUpdateDto)
        {
            try
            {
                Genre genre = _mapper.Map<Genre>(genreUpdateDto);
                _genreRepository.Update(genre);
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
                var genre = _genreRepository.Read(id);
                _genreRepository.Delete(genre);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
