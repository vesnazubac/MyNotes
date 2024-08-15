using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyNotes.Domain.Entities;

namespace MyNotes.Application.Repositories.Users
{
    public interface IUserRepository
    {
        public User Register(User user);
        public List<User> GetUsers();
        public User GetById(Guid id);
        public User? Authenticate(AuthenticateRequest model);
    }
}
