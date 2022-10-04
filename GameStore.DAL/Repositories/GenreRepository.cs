using GameStore.DAL.Data;
using GameStore.DAL.Entities;
using GameStore.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Repositories
{
    public class GenreRepository : Repository<Genre>, IGenreRepository
    {
        public GenreRepository(StoreDbContext context) : base(context)
        {

        }
      
    }
}
