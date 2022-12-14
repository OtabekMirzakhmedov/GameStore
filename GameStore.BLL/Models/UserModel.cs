using System;
using System.Collections.Generic;
using System.Text;

namespace GameStore.BLL.Models
{
    public class UserModel
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string ImageUrl { get; set; }
    }
}
