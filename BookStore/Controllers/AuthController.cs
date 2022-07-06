using BookStore.Interfaces.IServices;
using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("SignUp")]
        public async Task<ResponseDto> SignUp([FromBody]UserCreateDto userSignUpDTO)
        {
            return await _authService.SignUp(userSignUpDTO);
        }

        [HttpPost("SignIn")]
        public async Task<ResponseDto> SignIn([FromBody]UserSignInDto userSignInDTO)
        {
             return await _authService.SignIn(userSignInDTO);
        }

        [HttpPost("Roles")]
        public async Task<ResponseDto> CreateRole([FromBody]RoleCreateDto role)
        {
            return await _authService.CreateRole(role);
        }

        [HttpPost("UserRole")]
        public async Task<ResponseDto> AddUserToRole([FromBody]UserRoleDto userRoleDto)
        {
            return await _authService.AddUserToRole(userRoleDto);
        }
    }
}
