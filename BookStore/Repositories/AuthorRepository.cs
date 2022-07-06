using BookStore.Interfaces.IRepositories;
using BookStore.Models;
using System.Net;
using System.Web.Http;

namespace BookStore.Repositories
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly AppDbContext _context;

        public AuthorRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Author> ReadAll()
        {
            try
            {
                var authors = _context.Authors.ToList();
                return authors;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            
        }
        public Author Read(Guid id)
        {
            try
            {
                var author = _context.Authors.First(i => i.AuthorId == id);
                return author;
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
        public void Create(Author author)
        {
            try
            {
                _context.Authors.Add(author);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Update(Author author)
        {
            try
            {
                _context.Authors.Update(author);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Delete(Author author)
        {
            try
            {
                _context.Authors.Remove(author);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
