using AutoMapper;
using GameStore.BLL.Interfaces;
using GameStore.BLL.Models;
using GameStore.DAL.Entities;
using GameStore.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unit;
        private readonly IMapper _mapper;

        public UserService(IUnitOfWork unit, IMapper mapper)
        {
            _unit = unit;
            _mapper = mapper;
        }

        public async Task AddAsync(UserModel model)
        {
            User user = _mapper.Map<User>(model);

            await _unit.UserRepository.AddAsync(user);
            await _unit.SaveAsync();
        }

        public bool CheckUserCredentials(LoginModel loginModel)
        {
            return _unit.UserRepository.CheckUserCredentials(loginModel.UserName, loginModel.Password);
        }

        public async Task DeleteAsync(int modelId)
        {
            await _unit.UserRepository.DeleteByIdAsync(modelId);
            await _unit.SaveAsync();
        }

        public  bool emailDuplicationCheck(string email)
        {
            return _unit.UserRepository.emailDuplicationCheck(email);
            
        }

        public async Task<IEnumerable<UserModel>> GetAllAsync()
        {
            IEnumerable<User> users = await _unit.UserRepository.GetAllAsync();
            return users.Select(i => _mapper.Map<UserModel>(i));
        }

        public  async Task<UserModel> GetByIdAsync(int id)
        {
            User user = await _unit.UserRepository.GetByIdAsync(id);
            return  _mapper.Map<UserModel>(user);
        }

        public UserModel GetUserByCredentials(LoginModel loginModel)
        {
            return _mapper.Map<UserModel>(_unit.UserRepository.GetUserByCredentials(loginModel.UserName, loginModel.Password));
        }

        public async Task UpdateAsync(int id, UserModel model)
        {
            User user = _mapper.Map<User>(model);
            _unit.UserRepository.Update(id, user);
            await _unit.SaveAsync();
        }
    }
}
