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
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IUserService _userService;
        public CommentController(ICommentService commentService, IUserService userService)
        {
            _commentService = commentService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentModel>>> Get() => Ok(await _commentService.GetAllAsync());

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] CommentModel value)
        {
            await _commentService.AddAsync(value);
            return Created("", value);
        }


        [HttpGet("games/{gameId}")]
        public async Task<ActionResult<IEnumerable<CommentViewModel>>> GetByCommentsByGameId(int gameId)
        {
            IEnumerable<CommentViewModel> comments = await _commentService.GetCommentsByGameId(gameId);

            foreach(CommentViewModel comment in comments)
            {
                UserModel userModel = await _userService.GetByIdAsync(comment.UserId);

                comment.UserImageUrl = userModel.ImageUrl;
                comment.UserLastName = userModel.LastName;
                comment.UserFirstName = userModel.FirstName;
            }
            return Ok(comments);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _commentService.DeleteAsync(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromRoute]int id, [FromBody] CommentModel value)
        {
            
            await _commentService.UpdateAsync(id, value);
            return Ok();

        }



    }
}
