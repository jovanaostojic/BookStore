using AutoMapper;
using BookStore.Models;
using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;
using System.Net;
using System.Web.Http;
using BookStore.Interfaces.IRepositories;
using BookStore.Interfaces.IServices;
using Microsoft.AspNetCore.Identity;

namespace BookStore.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public IEnumerable<UserDto> GetAll()
        {
            try
            {
                var users = _userRepository.ReadAll();
                IEnumerable<UserDto> usersDto = _mapper.Map<IEnumerable<UserDto>>(users);
                return usersDto;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        public UserDto Get(Guid id)
        {
            try
            {
                var user = _userRepository.Read(id);
                UserDto userDto = _mapper.Map<UserDto>(user);
                return userDto;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No user with ID = " + id),
                    ReasonPhrase = "User ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Post(UserCreateDto userCreateDto)
        {
            try
            {
                User user = _mapper.Map<User>(userCreateDto);
                _userRepository.Create(user);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Put(UserUpdateDto userUpdateDto)
        {
            try
            {
                User user = _mapper.Map<User>(userUpdateDto);
                _userRepository.Update(user);
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
                var user = _userRepository.Read(id);
                _userRepository.Delete(user);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
