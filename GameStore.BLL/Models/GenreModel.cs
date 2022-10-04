using System;
using System.Collections.Generic;
using System.Text;

namespace GameStore.BLL.Models
{
    public class GenreModel
    {
        public int Id { get; set; }

        public string GenreName { get; set; }

        public ICollection<int> GameGenreIds { get; set; }
    }
}
