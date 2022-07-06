using BookStore.Models;
using System.Net;
using System.Web.Http;
using BookStore.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> ReadAll()
        {
            try
            {
                var users = _context.Users.ToList();
                _context.Countries.Load();
                return users;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

        }
        public User Read(Guid id)
        {
            try
            {
                var user = _context.Users.First(i => i.Id == id);
                _context.Countries.Load();
                return user;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No user with ID = " + id),
                    ReasonPhrase = "User ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Create(User user)
        {
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Update(User user)
        {
            try
            {
                _context.Users.Update(user);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Delete(User user)
        {
            try
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
