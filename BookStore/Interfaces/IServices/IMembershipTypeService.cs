using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;

namespace BookStore.Interfaces.IServices
{
    public interface IMembershipTypeService
    {
        public IEnumerable<MembershipTypeDto> GetAll();
        public MembershipTypeDto Get(Guid id);
        public void Post(MembershipTypeCreateDto membershipType);
        public void Put(MembershipTypeUpdateDto membershipType);
        public void Delete(Guid id);
    }
}
