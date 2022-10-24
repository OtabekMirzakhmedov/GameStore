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
            CreateMap<Comment, CommentModel>().
                ForMember(dest => dest.Text, src => src.MapFrom(i => i.Text)).
                ForMember(dest => dest.Id, src => src.MapFrom(i => i.Id)).
                ForMember(dest => dest.ParentCommentId, src => src.MapFrom(i => i.ParentId)).
                ForMember(dest => dest.GameId, src => src.MapFrom(i => i.GameId)).
                ForMember(dest => dest.UserId, src => src.MapFrom(i => i.UserId)).
                ForMember(dest => dest.CreatedTime, src => src.MapFrom(i => i.CreatedTime)).ReverseMap();

            CreateMap<Comment, CommentViewModel>().
                ForMember(dest => dest.Text, src => src.MapFrom(i => i.Text)).
                ForMember(dest => dest.Id, src => src.MapFrom(i => i.Id)).
                ForMember(dest => dest.ParentCommentId, src => src.MapFrom(i => i.ParentId)).
                ForMember(dest => dest.GameId, src => src.MapFrom(i => i.GameId)).
                ForMember(dest => dest.UserId, src => src.MapFrom(i => i.UserId)).
                ForMember(dest => dest.CreatedTime, src => src.MapFrom(i => i.CreatedTime)).ReverseMap();
        }
    }
}
