using GameStore.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GameStore.BLL.Models
{
    public class CommentViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedTime { get; set; }
        public int ParentCommentId { get; set; }
        public int GameId {get; set; }
        public int UserId { get; set; }
        public string UserImageUrl { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
    }
}
