using GameStore.DAL.Data;
using GameStore.DAL.Entities;
using GameStore.DAL.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(StoreDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Comment>> GetCommentsByGameId(int gameId)
        {
            return await dbContext.Set<Comment>().Where(i => i.GameId == gameId).ToListAsync();
        }

        public void Update(int id, Comment entity)
        {
            Comment comment = dbContext.Set<Comment>().Find(id);
            comment.Text = entity.Text;
            comment.CreatedTime = entity.CreatedTime;
            dbContext.SaveChanges();
            
        }
    }
}
