using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GameStore.BLL.Interfaces;
using GameStore.BLL.Models;
using GameStore.BLL.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GameStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> Get() => Ok(await _userService.GetAllAsync());

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] UserModel value)
        {
            await _userService.AddAsync(value);
            return Created("SUCCESS", value);
        }
        [HttpGet("email/{email}")]
        public ActionResult emailCheck(string email)
        {
            if (_userService.emailDuplicationCheck(email))
            {
                return Ok("duplicate");
            }

            return Ok("not duplicate");
     
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _userService.DeleteAsync(id);
            return Ok();
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginModel loginModel)
        {
            if (_userService.CheckUserCredentials(loginModel))
            {
                return Ok("success");
            }
            else
            {
                return Ok("error");
            }
        }
        [HttpPost("getuser")]
        public async Task<ActionResult<UserModel>> GetUserByCredentials([FromBody] LoginModel loginModel)
        {
            UserModel user = _userService.GetUserByCredentials(loginModel);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromRoute] int id, [FromBody] UserModel value)
        {

            await _userService.UpdateAsync(id, value);

            return Ok();

        }
    }
}
