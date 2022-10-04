using System;
using System.Collections.Generic;
using System.Text;

namespace GameStore.DAL.Entities
{
    public class GameGenre : BaseEntity
    {
        public int GameId { get; set; }

        public int GenreId { get; set; }

        public virtual Game Game { get; set; }

        public  virtual Genre Genre { get; set; }
    }
}
