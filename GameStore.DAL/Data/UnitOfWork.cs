using GameStore.DAL.Interface;
using GameStore.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Data
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly StoreDbContext _dbContext;

        public UnitOfWork(StoreDbContext dbContext)
        {
            _dbContext = dbContext;
            GameRepository = new GameRepository(_dbContext);
            GenreRepository = new GenreRepository(_dbContext);
            GameGenreRepository = new GameGenreRepository(_dbContext);
            UserRepository = new UserRepository(_dbContext);
            CommentRepository = new CommentRepository(_dbContext);

        }

        public IGameRepository GameRepository { get; private set; }

        public IGenreRepository GenreRepository { get; private set; }

        public IGameGenreRepository GameGenreRepository { get; private set; }

        public IUserRepository UserRepository { get; private set; }

        public ICommentRepository CommentRepository { get; private set; }


        public void Dispose()
        {
            _dbContext.Dispose();
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
