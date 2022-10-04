using GameStore.DAL.Data;
using GameStore.DAL.Entities;
using GameStore.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Repositories
{
    public class GameGenreRepository : Repository<GameGenre>, IGameGenreRepository
    {
        public GameGenreRepository(StoreDbContext context) : base(context)
        {

        }
    
    }
}
