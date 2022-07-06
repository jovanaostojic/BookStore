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
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _countryService;

        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        // GET: Country
        [HttpGet]
        public IEnumerable<CountryDto> GetAll()
        {
            return _countryService.GetAll();
        }

        // GET: Country/5
        [HttpGet("{id}")]
        public CountryDto Get(Guid id)
        {
            return _countryService.Get(id);
        }

        // POST: Country
        [HttpPost]
        public void Post([FromBody] CountryCreateDto countryCreateDto)
        {
            _countryService.Post(countryCreateDto);
        }

        // PUT: Country/5
        [HttpPut("{id}")]
        public void Put([FromBody] CountryUpdateDto countryUpdateDto)
        {
            _countryService.Put(countryUpdateDto);
        }

        // DELETE: Country/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _countryService.Delete(id);
        }
    }
}
