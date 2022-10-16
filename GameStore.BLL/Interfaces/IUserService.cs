using GameStore.BLL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.BLL.Interfaces
{
    public interface IUserService : ICrud<UserModel>
    {
        bool emailDuplicationCheck(string email);

        bool CheckUserCredentials(LoginModel loginModel);

        UserModel GetUserByCredentials(LoginModel loginModel);
    }

    
}
