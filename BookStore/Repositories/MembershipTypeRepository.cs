using BookStore.Models;
using BookStore.Interfaces.IRepositories;
using System.Net;
using System.Web.Http;

namespace BookStore.Repositories
{
    public class MembershipTypeRepository : IMembershipTypeRepository
    {
        private readonly AppDbContext _context;

        public MembershipTypeRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<MembershipType> ReadAll()
        {
            try
            {
                var membershipTypes = _context.MembershipTypes.ToList();
                return membershipTypes;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

        }
        public MembershipType Read(Guid id)
        {
            try
            {
                var membershipType = _context.MembershipTypes.First(i => i.MembershipTypeId == id);
                return membershipType;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No membershipType with ID = " + id),
                    ReasonPhrase = "MembershipType ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Create(MembershipType membershipType)
        {
            try
            {
                _context.MembershipTypes.Add(membershipType);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Update(MembershipType membershipType)
        {
            try
            {
                _context.MembershipTypes.Update(membershipType);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Delete(MembershipType membershipType)
        {
            try
            {
                _context.MembershipTypes.Remove(membershipType);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
