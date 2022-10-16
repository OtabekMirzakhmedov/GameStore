using GameStore.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Interface
{
    public interface IUserRepository : IRepository<User>
    {
        public bool emailDuplicationCheck(string email);

        public bool CheckUserCredentials (string username, string password);

        public User GetUserByCredentials(string username, string password);
        void Update(int id, User user);
    }
}
