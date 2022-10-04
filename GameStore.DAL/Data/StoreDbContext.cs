using Microsoft.EntityFrameworkCore;
using GameStore.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GameStore.DAL.Data
{
    public class StoreDbContext : DbContext
    {
        public StoreDbContext()
        {

        }


        public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=GameMarket;Trusted_Connection=True;");
        }


        public DbSet <Game> Games { get; set; }
        public DbSet <Genre> Genres { get; set; }

        public DbSet<GameGenre> GameGenres { get; set; }


 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GameGenre>().HasKey(sc => new { sc.GameId, sc.GenreId });

            modelBuilder.Entity<GameGenre>()
                .HasOne<Game>(sc => sc.Game)
                .WithMany(s => s.GameGenres)
                .HasForeignKey(sc => sc.GameId);


            modelBuilder.Entity<GameGenre>()
                .HasOne<Genre>(sc => sc.Genre)
                .WithMany(s => s.GameGenres)
                .HasForeignKey(sc => sc.GenreId);

        }


    }
}
