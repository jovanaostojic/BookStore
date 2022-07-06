using BookStore.Models;
using BookStore.Interfaces.IRepositories;
using System.Net;
using System.Web.Http;

namespace BookStore.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly AppDbContext _context;

        public GenreRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Genre> ReadAll()
        {
            try
            {
                var genres = _context.Genres.ToList();
                return genres;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

        }
        public Genre Read(Guid id)
        {
            try
            {
                var genre = _context.Genres.First(i => i.GenreId == id);
                return genre;
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
        public void Create(Genre genre)
        {
            try
            {
                _context.Genres.Add(genre);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Update(Genre genre)
        {
            try
            {
                _context.Genres.Update(genre);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Delete(Genre genre)
        {
            try
            {
                _context.Genres.Remove(genre);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
