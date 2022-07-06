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
    public class MembershipTypeService : IMembershipTypeService
    {
        private readonly IMembershipTypeRepository _membershipTypeRepository;
        private readonly IMapper _mapper;

        public MembershipTypeService(IMembershipTypeRepository membershipTypeRepository, IMapper mapper)
        {
            _membershipTypeRepository = membershipTypeRepository;
            _mapper = mapper;
        }

        public IEnumerable<MembershipTypeDto> GetAll()
        {
            try
            {
                var membershipTypes = _membershipTypeRepository.ReadAll();
                IEnumerable<MembershipTypeDto> membershipTypesDto = _mapper.Map<IEnumerable<MembershipTypeDto>>(membershipTypes);
                return membershipTypesDto;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        public MembershipTypeDto Get(Guid id)
        {
            try
            {
                var membershipType = _membershipTypeRepository.Read(id);
                MembershipTypeDto membershipTypeDto = _mapper.Map<MembershipTypeDto>(membershipType);
                return membershipTypeDto;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No membershipType with ID = " + id),
                    ReasonPhrase = "MembershipType ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Post(MembershipTypeCreateDto membershipTypeCreateDto)
        {
            try
            {
                MembershipType membershipType = _mapper.Map<MembershipType>(membershipTypeCreateDto);
                _membershipTypeRepository.Create(membershipType);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Put(MembershipTypeUpdateDto membershipTypeUpdateDto)
        {
            try
            {
                MembershipType membershipType = _mapper.Map<MembershipType>(membershipTypeUpdateDto);
                _membershipTypeRepository.Update(membershipType);
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
                var membershipType = _membershipTypeRepository.Read(id);
                _membershipTypeRepository.Delete(membershipType);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
