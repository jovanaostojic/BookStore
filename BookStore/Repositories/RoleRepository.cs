using BookStore.Models;
using BookStore.Interfaces.IRepositories;
using System.Net;
using System.Web.Http;
using Microsoft.AspNetCore.Identity;

namespace BookStore.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AppDbContext _context;
        private readonly RoleManager<Role> _roleManager;

        public RoleRepository(AppDbContext context, RoleManager<Role> roleManager)
        {
            _context = context;
            _roleManager = roleManager;
        }

        public IEnumerable<Role> ReadAll()
        {
            try
            {
                var roles = _context.Roles.ToList();
                return roles;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        public Role Read(Guid id)
        {
            try
            {
                var role = _context.Roles.First(i => i.Id == id);
                return role;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No role with ID = " + id),
                    ReasonPhrase = "Role ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Create(Role role)
        {
            try
            {
                _context.Roles.Add(role);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Update(Role role)
        {
            //try
            //{
                _context.Roles.Update(role);
                //_roleManager.UpdateAsync(role);
           _context.SaveChanges();
            /*}
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }*/
        }
        public void Delete(Role role)
        {
            try
            {
                _context.Roles.Remove(role);
                _context.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
