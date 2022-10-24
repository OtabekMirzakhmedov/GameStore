using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Interface
{
    public interface IUnitOfWork
    {

        IGameRepository GameRepository { get; }

        IGenreRepository GenreRepository { get; }

        IGameGenreRepository GameGenreRepository { get; }

        IUserRepository UserRepository { get; }

        ICommentRepository CommentRepository { get; }

        Task SaveAsync();

    }
}
