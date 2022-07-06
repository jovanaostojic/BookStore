using BookStore.Interfaces.IRepositories;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Web.Http;

namespace BookStore.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;

        public BookRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Book> ReadAll()
        {
            try
            {
                var books = _context.Books.ToList();
                _context.Genres.Load();
                _context.Authors.Load();
                _context.Users.Load();
                return books;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

        }
        public Book Read(Guid id)
        {
            try
            {
                var book = _context.Books.First(i => i.BookId == id);
                _context.Genres.Load();
                _context.Authors.Load();
                _context.Users.Load();
                return book;
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
        public void Create(Book book)
        {
            try
            {
                _context.Books.Add(book);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Update(Book book)
        {
            try
            {
                _context.Books.Update(book);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Delete(Book book)
        {
            try
            {
                _context.Books.Remove(book);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
