using BookStore.Models;
using BookStore.Models.CreateDto;
using BookStore.Models.Dto;

namespace BookStore.Interfaces.IServices
{
    public interface IAuthService
    {
        public string GenerateJwt(User user, IList<string> roles);
        public Task<ResponseDto> SignUp(UserCreateDto userSignUpDTO);
        public Task<ResponseDto> SignIn(UserSignInDto userSignInDTO);
        public Task<ResponseDto> CreateRole(RoleCreateDto roleCreateDto);
        public Task<ResponseDto> AddUserToRole(UserRoleDto userRoleDto);
    }
}
