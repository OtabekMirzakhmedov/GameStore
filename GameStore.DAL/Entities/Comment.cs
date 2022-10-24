using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GameStore.DAL.Entities
{
    public class Comment : BaseEntity
    {
        [Required, MaxLength(600)]
        public string Text { get; set; }

        [Required]
        public int ParentId { get; set; }

        [Required]
        public DateTime CreatedTime { get; set; }

        public int GameId { get; set; }

        public int UserId { get; set; }

        public Game Game { get; set; }

        public User User { get; set; }
    }
}
