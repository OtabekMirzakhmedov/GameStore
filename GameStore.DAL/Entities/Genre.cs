using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GameStore.DAL.Entities
{
    public class Genre : BaseEntity
    {
        [Required, MaxLength(50)]
        public string GenreName { get; set; }

        public virtual ICollection<GameGenre> GameGenres { get; set; }
    }
}
