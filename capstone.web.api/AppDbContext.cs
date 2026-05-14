using Microsoft.EntityFrameworkCore;
using capstone.web.api.Models;

namespace capstone.web.api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<Status> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Quest>()
                .HasOne(q => q.User)
                .WithMany(u => u.Quests)
                .HasForeignKey(q => q.UserId);
        }

    }
}
