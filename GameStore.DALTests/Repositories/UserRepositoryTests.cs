using Microsoft.VisualStudio.TestTools.UnitTesting;
using GameStore.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using GameStore.DAL.Interface;

namespace GameStore.DAL.Repositories.Tests
{


    [TestClass()]
    public class UserRepositoryTests
    {

        private readonly IUnitOfWork _unit;

        //private readonly UserRepository _userRepository;

        public UserRepositoryTests(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [TestMethod()]
        public void EmailDuplicationCheckTest()
        {
            //arrange
            string email = "user1@game.com";

            // act
            Console.WriteLine(_unit.UserRepository.GetAllAsync());

            bool check = _unit.UserRepository.emailDuplicationCheck(email);

            Assert.AreEqual(check, true);
        }

  
    }
}