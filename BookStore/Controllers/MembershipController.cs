using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BookStore.Models;
using BookStore.Interfaces.IServices;
using BookStore.Models.Dto;
using BookStore.Models.CreateDto;
using BookStore.Models.UpdateDto;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipController : ControllerBase
    {
        private readonly IMembershipService _membershipService;

        public MembershipController(IMembershipService membershipService)
        {
            _membershipService = membershipService;
        }

        // GET: Membership
        [HttpGet]
        public IEnumerable<MembershipDto> GetAll()
        {
            return _membershipService.GetAll();
        }

        // GET: Membership/5
        [HttpGet("{id}")]
        public MembershipDto Get(Guid id)
        {
            return _membershipService.Get(id);
        }

        // GET: Membership
        [HttpGet("expiryDate/{userId}")]
        public DateTime? GetLastExpiryDateByUserId(Guid userId)
        {
            return _membershipService.GetLastExpiryDateByUserId(userId);
        }

        // POST: Membership
        [HttpPost]
        public void Post([FromBody] MembershipCreateDto membershipCreateDto)
        {
            _membershipService.Post(membershipCreateDto);
        }

        // PUT: Membership/5
        [HttpPut("{id}")]
        public void Put([FromBody] MembershipUpdateDto membershipUpdateDto)
        {
            _membershipService.Put(membershipUpdateDto);
        }

        // DELETE: Membership/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _membershipService.Delete(id);
        }
    }
}
