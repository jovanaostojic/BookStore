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
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public RoleService(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        public IEnumerable<RoleDto> GetAll()
        {
            try
            {
                var roles = _roleRepository.ReadAll();
                IEnumerable<RoleDto> rolesDto = _mapper.Map<IEnumerable<RoleDto>>(roles);
                return rolesDto;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        public RoleDto Get(Guid id)
        {
            try
            {
                var role = _roleRepository.Read(id);
                RoleDto roleDto = _mapper.Map<RoleDto>(role);
                return roleDto;
            }
            catch
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("No role with ID = " + id),
                    ReasonPhrase = "Role ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
        }
        public void Post(RoleCreateDto roleCreateDto)
        {
            try
            {
                Role role = _mapper.Map<Role>(roleCreateDto);
                _roleRepository.Create(role);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
        public void Put(RoleUpdateDto roleUpdateDto)
        {
            /*try
            {*/
            Role role = _mapper.Map<Role>(roleUpdateDto);
                _roleRepository.Update(role);
            /*}
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }*/
        }
        public void Delete(Guid id)
        {
            try
            {
                var role = _roleRepository.Read(id);
                _roleRepository.Delete(role);
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
