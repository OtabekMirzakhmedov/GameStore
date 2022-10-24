using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Text;

namespace GameStore.DAL.Entities
{
    public class Game : BaseEntity
    {
        [Required, MaxLength(255)]
        public string Title { get; set; }

        [Required, MaxLength(600)]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }

        [Required, MaxLength(250)]
        public string imageUrl { get; set; }

        [Required, MaxLength(600)]
        public string GenreName { get; set; }

        public virtual ICollection<GameGenre> GameGenres { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        
    }
}
