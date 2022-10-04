using Microsoft.EntityFrameworkCore;
using GameStore.DAL.Data;
using GameStore.DAL.Entities;
using GameStore.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Repositories
{
    public class GameRepository : Repository<Game>, IGameRepository
    {
        public GameRepository(StoreDbContext context) : base(context)
        {

        }
        public void Update(int id, Game game)
        {
            Game game1 = dbContext.Set<Game>().Find(id);
            game1.Description = game.Description;
            game1.Price = game.Price;
            game1.Title = game.Title;
            game1.imageUrl = game.imageUrl;
            game1.GenreName = game.GenreName;
            dbContext.SaveChanges();   
        }
    }

}
