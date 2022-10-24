using GameStore.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Interface
{
    public interface ICommentRepository : IRepository<Comment>
    {

        Task<IEnumerable<Comment>> GetCommentsByGameId(int gameId);
        void Update(int id, Comment entity);

    }
}
