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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: User
        [HttpGet]
        public IEnumerable<UserDto> GetAll()
        {
            return _userService.GetAll();
        }

        // GET: User/5
        [HttpGet("{id}")]
        public UserDto Get(Guid id)
        {
            return _userService.Get(id);
        }


        // POST: User
        [HttpPost]
        public void Post([FromBody] UserCreateDto userCreateDto)
        {
            _userService.Post(userCreateDto);
        }

        // PUT: User/5
        [HttpPut("{id}")]
        public void Put([FromBody] UserUpdateDto userUpdateDto)
        {
            _userService.Put(userUpdateDto);
        }

        // DELETE: User/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _userService.Delete(id);
        }
    }
}
