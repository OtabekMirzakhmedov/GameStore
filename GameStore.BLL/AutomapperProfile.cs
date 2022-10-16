using AutoMapper;
using GameStore.BLL.Models;
using GameStore.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GameStore.BLL
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Game, GameModel>().ReverseMap();
            CreateMap<User, UserModel>().ReverseMap();
        }
    }
}
