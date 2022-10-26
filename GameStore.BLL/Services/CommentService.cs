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
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork _unit;
        private readonly IMapper _mapper;

        public CommentService(IUnitOfWork unit, IMapper mapper)
        {
            _unit = unit;
            _mapper = mapper;
        }

        public async Task AddAsync(CommentModel model)
        {
            Comment comment = _mapper.Map<Comment>(model);

            await _unit.CommentRepository.AddAsync(comment);
            await _unit.SaveAsync();
        }

        public async Task DeleteAsync(int modelId)
        {
            await _unit.CommentRepository.DeleteByIdAsync(modelId);
            await _unit.SaveAsync();
        }

        public Task<IEnumerable<CommentModel>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<CommentModel> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CommentViewModel>> GetCommentsByGameId(int gameId)
        {
            IEnumerable<Comment> comments = await _unit.CommentRepository.GetAllAsync();
            return comments.Select(i => _mapper.Map<CommentViewModel>(i));
        }

        public async Task UpdateAsync(int id, CommentModel model)
        {
            Comment comment = _mapper.Map<Comment>(model);
            _unit.CommentRepository.Update(id, comment);
            await _unit.SaveAsync();
        }
    }
}
