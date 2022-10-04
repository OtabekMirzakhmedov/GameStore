using AutoMapper;
using GameStore.BLL.Interfaces;
using GameStore.BLL.Models;
using GameStore.DAL.Entities;
using GameStore.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.BLL.Services
{
    public class GameService : IGameService
    {
        private readonly IUnitOfWork _unit;
        private readonly IMapper _mapper;

        public GameService(IUnitOfWork unit, IMapper mapper)
        {
            _unit = unit;
            _mapper = mapper;
        }

        public async Task AddAsync(GameModel model)
        {
            Game game = _mapper.Map<Game>(model);

            await _unit.GameRepository.AddAsync(game);
            await _unit.SaveAsync();
        }

        public async Task DeleteAsync(int modelId)
        {
            await _unit.GameRepository.DeleteByIdAsync(modelId);
            await _unit.SaveAsync();
        }

        public async Task<IEnumerable<GameModel>> GetAllAsync()
        {
            IEnumerable<Game> games = await _unit.GameRepository.GetAllAsync();
            return games.Select(i => _mapper.Map<GameModel>(i));
        }

        public async Task<GameModel> GetByIdAsync(int id)
        {
            Game game = await _unit.GameRepository.GetByIdAsync(id);
            return _mapper.Map<GameModel>(game);
        }

        public async Task UpdateAsync(int id, GameModel model)
        {
            Game game = _mapper.Map<Game>(model);
             _unit.GameRepository.Update(id, game);
        }
    }
}
