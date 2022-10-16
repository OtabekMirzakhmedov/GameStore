using GameStore.DAL.Data;
using GameStore.DAL.Entities;
using GameStore.DAL.Interface;
using System;
using System.Linq;

namespace GameStore.DAL.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(StoreDbContext context) : base(context)
        {

        }

        public bool CheckUserCredentials(string username, string password)
        {
            return dbContext.Set<User>().Any(i => i.UserName == username && i.Password == password);
        }

        public  bool emailDuplicationCheck(string email)
        {
            Console.WriteLine(email);
            return dbContext.Set<User>().Select(i => i.Email).ToList().Any(j => j == email);
        }

        public User GetUserByCredentials(string username, string password)
        {
            return dbContext.Set<User>().Single(i => i.UserName == username && i.Password == password);
        }

        public void Update(int id, User user)
        {
            User userWithOldValues = dbContext.Set<User>().Find(id);
            userWithOldValues.ImageUrl = user.ImageUrl;
            dbContext.SaveChanges();
        }
    }
}
