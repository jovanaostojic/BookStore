using AutoMapper;
using BookStore.AppSettings;
using BookStore.Interfaces.IServices;
using BookStore.Models;
using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace BookStore.Services
{
    public class AuthService : IAuthService
    {
        private static Jwt _jwt { get; set; }
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;
        public AuthService(IOptions<Jwt> jwt, IMapper mapper,
                              UserManager<User> userManager,
                              RoleManager<Role> roleManager)
        {
            _jwt = jwt.Value;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public string GenerateJwt(User user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));
            claims.AddRange(roleClaims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_jwt.ExpirationInDays));

            var token = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Issuer,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<ResponseDto> SignUp(UserCreateDto userSignUpDto)
        {
            var user = _mapper.Map<UserCreateDto, User>(userSignUpDto);

            var userCreateResult = await _userManager.CreateAsync(user, userSignUpDto.Password);
            var addUserToRoleResult = await _userManager.AddToRoleAsync(user, "Admin");

            if (userCreateResult.Succeeded && addUserToRoleResult.Succeeded)
            {
                return new ResponseDto(HttpStatusCode.Created, "Created");
            }

            return new ResponseDto(HttpStatusCode.InternalServerError, "Internal Server Error");
        }

        public async Task<ResponseDto> SignIn(UserSignInDto userSignInDto)
        {
            Console.WriteLine(userSignInDto.UserName);
            var user = _userManager.Users.SingleOrDefault(u => u.UserName == userSignInDto.UserName);
            if (user is null)
            {
                return new ResponseDto(HttpStatusCode.NotFound, "Not Found");
            }

            var userSigninResult = await _userManager.CheckPasswordAsync(user, userSignInDto.Password);

            if (userSigninResult)
            {
                var roles = await _userManager.GetRolesAsync(user);
                return new ResponseDto(HttpStatusCode.OK, "Ok", GenerateJwt(user, roles), roles, user.Id);
            }

            return new ResponseDto(HttpStatusCode.BadRequest, "Bad Request");
        }

        public async Task<ResponseDto> CreateRole(RoleCreateDto role)
        {
            if (string.IsNullOrWhiteSpace(role.Name))
            {
                return new ResponseDto(HttpStatusCode.BadRequest, "Bad Request");
            }

            var newRole = new Role
            {
                Name = role.Name
            };

            var roleResult = await _roleManager.CreateAsync(newRole);

            if (roleResult.Succeeded)
            {
                return new ResponseDto(HttpStatusCode.OK, "Ok");
            }

            return new ResponseDto(HttpStatusCode.InternalServerError, "Internal Server Error");
        }

        public async Task<ResponseDto> AddUserToRole(UserRoleDto userRoleDto)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.UserName == userRoleDto.UserName);

            if (user is null)
            {
                return new ResponseDto(HttpStatusCode.NotFound, "Not Found");
            }

            var result = await _userManager.AddToRoleAsync(user, userRoleDto.RoleName);

            if (result.Succeeded)
            {
                return new ResponseDto(HttpStatusCode.OK, "Ok");
            }

            return new ResponseDto(HttpStatusCode.InternalServerError, "Internal Server Error");
        }
    }
}
