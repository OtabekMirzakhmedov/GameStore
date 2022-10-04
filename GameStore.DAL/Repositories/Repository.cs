using Microsoft.EntityFrameworkCore;
using GameStore.DAL.Data;
using GameStore.DAL.Entities;
using GameStore.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameStore.DAL.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly StoreDbContext dbContext;

        public Repository(StoreDbContext context)
        {
            dbContext = context;
        }

        public async Task AddAsync(TEntity entity)
        {
            await dbContext.Set<TEntity>().AddAsync(entity);
        }

        public void Delete(TEntity entity)
        {
            dbContext.Set<TEntity>().Remove(entity);
        }

        public async Task DeleteByIdAsync(int id)
        {
            TEntity temp = await GetByIdAsync(id);
            dbContext.Set<TEntity>().Remove(temp);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await dbContext.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await dbContext.Set<TEntity>().FindAsync(id);
        }

        

    }
}
