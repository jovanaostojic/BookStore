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
    public class GenreController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenreController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        // GET: Genre
        [HttpGet]
        public IEnumerable<GenreDto> GetAll()
        {
            return _genreService.GetAll();
        }

        // GET: Genre/5
        [HttpGet("{id}")]
        public GenreDto Get(Guid id)
        {
            return _genreService.Get(id);
        }

        // POST: Genre
        [HttpPost]
        public void Post([FromBody] GenreCreateDto genreCreateDto)
        {
            _genreService.Post(genreCreateDto);
        }

        // PUT: Genre/5
        [HttpPut("{id}")]
        public void Put([FromBody] GenreUpdateDto genreUpdateDto)
        {
            _genreService.Put(genreUpdateDto);
        }

        // DELETE: Genre/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _genreService.Delete(id);
        }
    }
}
