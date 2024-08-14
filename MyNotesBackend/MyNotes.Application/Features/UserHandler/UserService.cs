using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyNotes.Application.Repositories.Users;
using MyNotes.Domain.Entities;
namespace MyNotes.Application.Features.UserHandler
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository) {
            _userRepository = userRepository;
        }
        public async Task<User> Register(User user)
        {
            return _userRepository.Register(user);
        }

        public async Task<List<User>> GetAll()
        {
            return _userRepository.GetUsers();
        }
    }
}
