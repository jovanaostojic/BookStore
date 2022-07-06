using AutoMapper;
using BookStore.Models;
using BookStore.Models.CreateDto;
using BookStore.Models.Dto;
using BookStore.Models.UpdateDto;

namespace BookStore
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Author, AuthorDto>();
            CreateMap<AuthorCreateDto, Author>();
            CreateMap<AuthorUpdateDto, Author>();

            CreateMap<Book, BookDto>();
            CreateMap<BookCreateDto, Book>();
            CreateMap<BookUpdateDto, Book>();

            CreateMap<Country, CountryDto>();
            CreateMap<CountryCreateDto, Country>();
            CreateMap<CountryUpdateDto, Country>();

            CreateMap<Genre, GenreDto>();
            CreateMap<GenreCreateDto, Genre>();
            CreateMap<GenreUpdateDto, Genre>();

            CreateMap<Membership, MembershipDto>();
            CreateMap<MembershipCreateDto, Membership>();
            CreateMap<MembershipUpdateDto, Membership>();

            CreateMap<MembershipType, MembershipTypeDto>();
            CreateMap<MembershipTypeCreateDto, MembershipType>();
            CreateMap<MembershipTypeUpdateDto, MembershipType>();

            CreateMap<Role, RoleDto>();
            CreateMap<RoleCreateDto, Role>();
            CreateMap<RoleUpdateDto, Role>();

            CreateMap<User, UserDto>();
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
        }
    }
}
