using BookStore.Models;
using BookStore.Interfaces.IRepositories;
using System.Net;
using System.Web.Http;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories
{
    public class MembershipRepository : IMembershipRepository
    {
        private readonly AppDbContext _context;

        public MembershipRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Membership> ReadAll()
        {
            try
            {
                var memberships = _context.Memberships.ToList();
                _context.Users.Load();
                _context.MembershipTypes.Load();
                return memberships;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

        }
        public Membership Read(Guid id)
        {
            try
            {
                var membership = _context.Memberships.First(i => i.MembershipId == id);
                _context.Users.Load();
                _context.MembershipTypes.Load();
                return membership;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No membership with ID = " + id),
                    ReasonPhrase = "Membership ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public IEnumerable<Membership> ReadByUserId(Guid userId)
        {

            try
            {
                var memberships = _context.Memberships.Where(i => i.UserId == userId);
                _context.Users.Load();
                _context.MembershipTypes.Load();
                return memberships;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No membership with userID = " + userId),
                    ReasonPhrase = "Membership with userID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Create(Membership membership)
        {
            try
            {
                _context.Memberships.Add(membership);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Update(Membership membership)
        {
            try
            {
                _context.Memberships.Update(membership);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Delete(Membership membership)
        {
            try
            {
                _context.Memberships.Remove(membership);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
