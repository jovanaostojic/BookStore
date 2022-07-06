using AutoMapper;
using BookStore.Models;
using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;
using BookStore.Interfaces.IRepositories;
using BookStore.Interfaces.IServices;
using System.Net;
using System.Web.Http;

namespace BookStore.Services
{
    public class CountryService : ICountryService
    {
        private readonly ICountryRepository _countryRepository;
        private readonly IMapper _mapper;

        public CountryService(ICountryRepository countryRepository, IMapper mapper)
        {
            _countryRepository = countryRepository;
            _mapper = mapper;
        }

        public IEnumerable<CountryDto> GetAll()
        {
            try
            {
                var countries = _countryRepository.ReadAll();
                IEnumerable<CountryDto> countriesDto = _mapper.Map<IEnumerable<CountryDto>>(countries);
                return countriesDto;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        public CountryDto Get(Guid id)
        {
            try
            {
                var country = _countryRepository.Read(id);
                CountryDto countryDto = _mapper.Map<CountryDto>(country);
                return countryDto;
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
        public void Post(CountryCreateDto countryCreateDto)
        {
            try
            {
                Country country = _mapper.Map<Country>(countryCreateDto);
                _countryRepository.Create(country);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Put(CountryUpdateDto countryUpdateDto)
        {
            try
            {
                Country country = _mapper.Map<Country>(countryUpdateDto);
                _countryRepository.Update(country);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Delete(Guid id)
        {
            try
            {
                var country = _countryRepository.Read(id);
                _countryRepository.Delete(country);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
