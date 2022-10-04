using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Interface
{
    public interface IUnitOfWork
    {
        //IUserRepository UserRepository { get; }

        IGameRepository GameRepository { get; }

        IGenreRepository GenreRepository { get; }

        IGameGenreRepository GameGenreRepository { get; }

        Task SaveAsync();

    }
}
