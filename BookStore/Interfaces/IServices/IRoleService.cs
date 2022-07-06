using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;

namespace BookStore.Interfaces.IServices
{
    public interface IRoleService
    {
        //proveri jos sta ti treba tu
        public IEnumerable<RoleDto> GetAll();
        public RoleDto Get(Guid id);
        public void Post(RoleCreateDto role);
        public void Put(RoleUpdateDto role);
        public void Delete(Guid id);
    }
}
