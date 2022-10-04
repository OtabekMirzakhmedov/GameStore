using GameStore.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Interface
{
    public interface IGameRepository : IRepository<Game>
    {
         void  Update(int id, Game entity);

    }
   
}
