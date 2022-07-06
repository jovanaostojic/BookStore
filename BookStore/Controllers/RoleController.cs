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
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        // GET: Role
        [HttpGet]
        public IEnumerable<RoleDto> GetAll()
        {
            return _roleService.GetAll();
        }

        // GET: Role/5
        [HttpGet("{id}")]
        public RoleDto Get(Guid id)
        {
            return _roleService.Get(id);
        }

        // POST: Role
        [HttpPost]
        public void Post([FromBody] RoleCreateDto roleCreateDto)
        {
            _roleService.Post(roleCreateDto);
        }

        // PUT: Role/5
        [HttpPut("{id}")]
        public void Put([FromBody] RoleUpdateDto roleUpdateDto)
        {
            _roleService.Put(roleUpdateDto);
        }

        // DELETE: Role/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _roleService.Delete(id);
        }
    }
}
