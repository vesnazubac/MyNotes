using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyNotes.Domain.Entities;
using MyNotes.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
namespace MyNotes.Application.Repositories.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _databaseContext;

        public UserRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public User Register(User user)
        {
            var registratedUser = _databaseContext.Users.Add(user);
            _databaseContext.SaveChanges();
            return registratedUser.Entity;
        }
        public List<User> GetUsers()
        {
            return _databaseContext.Users.ToList();
        }
        public User GetById(Guid id)
        {
            return _databaseContext.Users.FirstOrDefault(x => x.Id == id);
        }
        public User? Authenticate(AuthenticateRequest model)
        {
            return _databaseContext.Users.SingleOrDefault(x=>x.UserName==model.Username && x.Password==model.Password);
        }
    }
}
