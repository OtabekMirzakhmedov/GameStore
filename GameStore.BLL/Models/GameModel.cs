using GameStore.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GameStore.BLL.Models
{
    public class GameModel
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public decimal Price { get; set; }
        public string imageUrl { get; set; }

        public string GenreName { get; set; }

  

    }
}
