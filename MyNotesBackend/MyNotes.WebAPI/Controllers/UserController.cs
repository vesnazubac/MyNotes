using Microsoft.AspNetCore.Mvc;
using MyNotes.Application.Features.NoteHandler;
using MyNotes.Application.Features.UserHandler;
using MyNotes.Domain.Entities;

namespace MyNotes.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/users")]
    public class UserController:ControllerBase
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

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var response = await _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
    }
}
