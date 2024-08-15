using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyNotes.Application.Repositories.Users;
using MyNotes.Domain.Entities;
namespace MyNotes.Application.Features.UserHandler
{
    public class UserService
    {
        private readonly AppSettings _appSettings;

        private readonly IUserRepository _userRepository;
        public UserService(IOptions<AppSettings> appSettings,IUserRepository userRepository) {
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
        }
        public async Task<User> Register(User user)
        {
            return _userRepository.Register(user);
        }

        public async Task<List<User>> GetAll()
        {
            return _userRepository.GetUsers();
        }

        public async Task<AuthenticateResponse?> Authenticate(AuthenticateRequest model)
        {
            var user = _userRepository.Authenticate(model);
              
            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = await generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }
        public User GetById(Guid id)
        {
            return  _userRepository.GetById(id);
        }

        private async Task<string> generateJwtToken(User user)
        {
            //Generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = await Task.Run(() =>
            {

                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                return tokenHandler.CreateToken(tokenDescriptor);
            });

            return tokenHandler.WriteToken(token);
        }

    }   

}
