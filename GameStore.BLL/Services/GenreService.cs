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
    public class GenreService : IGenreService
    {
        private readonly IUnitOfWork _unit;
        private readonly IMapper _mapper;

        public GenreService(IUnitOfWork unit, IMapper mapper)
        {
            _unit = unit;
            _mapper = mapper;
        }
        public async Task AddAsync(GenreModel model)
        {
            Genre genre = _mapper.Map<Genre>(model);
            await _unit.GenreRepository.AddAsync(genre);
            await _unit.SaveAsync();
        }

        public async Task DeleteAsync(int modelId)
        {
            await _unit.GenreRepository.DeleteByIdAsync(modelId);
            await _unit.SaveAsync();    
        }

        public async Task<IEnumerable<GenreModel>> GetAllAsync()
        {
            IEnumerable<Genre> genres = await _unit.GenreRepository.GetAllAsync();
            return genres.Select(i => _mapper.Map<GenreModel>(i));
        }

        public async Task<GenreModel> GetByIdAsync(int id)
        {
            Genre genre = await _unit.GenreRepository.GetByIdAsync(id);
            return _mapper.Map<GenreModel>(genre);
        }

        public Task UpdateAsync(int id, GenreModel model)
        {
            throw new NotImplementedException();
        }
    }
}
