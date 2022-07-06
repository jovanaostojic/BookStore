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
    public class MembershipService : IMembershipService
    {
        private readonly IMembershipRepository _membershipRepository;
        private readonly IMapper _mapper;

        public MembershipService(IMembershipRepository membershipRepository, IMapper mapper)
        {
            _membershipRepository = membershipRepository;
            _mapper = mapper;
        }

        public IEnumerable<MembershipDto> GetAll()
        {
            try
            {
                var memberships = _membershipRepository.ReadAll();
                IEnumerable<MembershipDto> membershipsDto = _mapper.Map<IEnumerable<MembershipDto>>(memberships);
                return membershipsDto;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        public MembershipDto Get(Guid id)
        {
            try
            {
                var membership = _membershipRepository.Read(id);
                MembershipDto membershipDto = _mapper.Map<MembershipDto>(membership);
                return membershipDto;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No membership with ID = " + id),
                    ReasonPhrase = "Membership ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public DateTime? GetLastExpiryDateByUserId(Guid userId)
        {
            try
            {
                var memberships = _membershipRepository.ReadByUserId(userId);
                DateTime? lastExpiryDate = memberships.Max(d => d.ExpiryDate);
                return lastExpiryDate;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            
        }
        public void Post(MembershipCreateDto membershipCreateDto)
        {
            try
            {
                Membership membership = _mapper.Map<Membership>(membershipCreateDto);
                _membershipRepository.Create(membership);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Put(MembershipUpdateDto membershipUpdateDto)
        {
            try
            {
                Membership membership = _mapper.Map<Membership>(membershipUpdateDto);
                _membershipRepository.Update(membership);
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
                var membership = _membershipRepository.Read(id);
                _membershipRepository.Delete(membership);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
