using GameStore.BLL.Models;
using GameStore.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.BLL.Interfaces
{
    public interface ICommentService : ICrud<CommentModel>
    {
        Task<IEnumerable<CommentViewModel>> GetCommentsByGameId(int gameId);
    }
}
