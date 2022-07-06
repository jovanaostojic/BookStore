using BookStore.Interfaces.IRepositories;
using BookStore.Models;
using System.Net;
using System.Web.Http;

namespace BookStore.Repositories
{
    public class CountryRepository : ICountryRepository
    {
        private readonly AppDbContext _context;

        public CountryRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Country> ReadAll()
        {
            try
            {
                var countries = _context.Countries.ToList();
                return countries;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

        }
        public Country Read(Guid id)
        {
            try
            {
                var country = _context.Countries.First(i => i.CountryId == id);
                return country;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No country with ID = " + id),
                    ReasonPhrase = "Country ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Create(Country country)
        {
            try
            {
                _context.Countries.Add(country);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Update(Country country)
        {
            try
            {
                _context.Countries.Update(country);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Delete(Country country)
        {
            try
            {
                _context.Countries.Remove(country);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
