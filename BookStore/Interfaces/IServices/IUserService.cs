using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;

namespace BookStore.Interfaces.IServices
{
    public interface IUserService
    {
        public IEnumerable<UserDto> GetAll();
        public UserDto Get(Guid id);
        public void Post(UserCreateDto user);
        public void Put(UserUpdateDto user);
        public void Delete(Guid id);
    }
}
