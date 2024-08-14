using Microsoft.AspNetCore.Mvc;
using MyNotes.Application.Features.NoteHandler;
using MyNotes.Application.Features.UserHandler;
using MyNotes.Domain.Entities;

namespace MyNotes.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/users")]
    public class UserController
    {   
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<User>> Register(User user)
        {
            await _userService.Register(user);
            return user;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _userService.GetAll();
        }
    }
}
