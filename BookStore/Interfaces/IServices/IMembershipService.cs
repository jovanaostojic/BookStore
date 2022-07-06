using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;

namespace BookStore.Interfaces.IServices
{
    public interface IMembershipService
    {
        public IEnumerable<MembershipDto> GetAll();
        public MembershipDto Get(Guid id);
        public DateTime? GetLastExpiryDateByUserId(Guid userId);
        public void Post(MembershipCreateDto membership);
        public void Put(MembershipUpdateDto membership);
        public void Delete(Guid id);
    }
}
