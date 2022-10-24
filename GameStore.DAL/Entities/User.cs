using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace GameStore.DAL.Entities
{
    public class User : BaseEntity
    {
        [DefaultValue("first")]
        public string FirstName { get; set; }
        [DefaultValue("first")]
        public string LastName { get; set; }
        [DefaultValue("first")]
        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string ImageUrl { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
