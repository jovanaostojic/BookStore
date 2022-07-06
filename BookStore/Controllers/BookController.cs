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
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // GET: Book
        [HttpGet]
        public IEnumerable<BookDto> GetAll()
        {
            return _bookService.GetAll();
        }

        // GET: Book/5
        [HttpGet("{id}")]
        public BookDto Get(Guid id)
        {
            return _bookService.Get(id);
        }

        // POST: Book
        [HttpPost]
        public void Post([FromBody] BookCreateDto bookCreateDto)
        {
            _bookService.Post(bookCreateDto);
        }

        // PUT: Book/5
        [HttpPut("{id}")]
        public void Put([FromBody] BookUpdateDto bookUpdateDto)
        {
            _bookService.Put(bookUpdateDto);
        }

        // DELETE: Book/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _bookService.Delete(id);
        }
    }
}
