using Microsoft.AspNetCore.Mvc;
using BookStore.Interfaces.IServices;
using BookStore.Models.Dto;
using BookStore.Models.CreateDto;
using BookStore.Models.UpdateDto;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        // GET: Author
        [HttpGet]
        public IEnumerable<AuthorDto> GetAll()
        {
            return _authorService.GetAll();
        }

        // GET: Author/5
        [HttpGet("{id}")]
        public AuthorDto Get(Guid id)
        {
            return _authorService.Get(id);
        }

        // POST: Author
        [HttpPost]
        public void Post([FromBody] AuthorCreateDto authorCreateDto)
        {
            _authorService.Post(authorCreateDto);
        }

        // PUT: Author/5
        [HttpPut("{id}")]
        public void Put([FromBody] AuthorUpdateDto authorUpdateDto)
        {
            _authorService.Put(authorUpdateDto);
        }

        // DELETE: Author/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _authorService.Delete(id);
        }
    }
}
