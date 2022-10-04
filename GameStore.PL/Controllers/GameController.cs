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
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;
        private readonly IGenreService _genreService;
        public GameController(IGameService gameService, IGenreService genreService)
        {
            _gameService = gameService;
            _genreService = genreService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameModel>>> Get() => Ok(await _gameService.GetAllAsync());

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] GameModel value)
        {
            await _gameService.AddAsync(value);
            return Created("", value);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _gameService.DeleteAsync(id);
            return Ok();
        }


        [HttpGet("games/{id}")]
        public async Task<ActionResult<GameModel>> GetByProductId(int id)
        {
            var game = await _gameService.GetByIdAsync(id);
            return Ok(game);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromRoute]int id, [FromBody] GameModel value)
        {
            
            await _gameService.UpdateAsync(id, value);

            return Ok();

        }



    }
}
