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
using BookStore.Models.UpdateDto;
using BookStore.Models.CreateDto;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipTypeController : ControllerBase
    {
        private readonly IMembershipTypeService _membershipTypeService;

        public MembershipTypeController(IMembershipTypeService membershipTypeService)
        {
            _membershipTypeService = membershipTypeService;
        }

        // GET: MembershipType
        [HttpGet]
        public IEnumerable<MembershipTypeDto> GetAll()
        {
            return _membershipTypeService.GetAll();
        }

        // GET: MembershipType/5
        [HttpGet("{id}")]
        public MembershipTypeDto Get(Guid id)
        {
            return _membershipTypeService.Get(id);
        }

        // POST: MembershipType
        [HttpPost]
        public void Post([FromBody] MembershipTypeCreateDto membershipTypeCreateDto)
        {
            _membershipTypeService.Post(membershipTypeCreateDto);
        }

        // PUT: MembershipType/5
        [HttpPut("{id}")]
        public void Put([FromBody] MembershipTypeUpdateDto membershipTypeUpdateDto)
        {
            _membershipTypeService.Put(membershipTypeUpdateDto);
        }

        // DELETE: MembershipType/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _membershipTypeService.Delete(id);
        }
    }
}
