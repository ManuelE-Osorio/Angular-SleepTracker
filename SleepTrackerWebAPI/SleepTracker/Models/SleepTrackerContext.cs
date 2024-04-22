using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SleepTracker.Models;

public class SleepTrackerContext(DbContextOptions<SleepTrackerContext> options) : IdentityDbContext<IdentityUser>(options)
{
    public DbSet<LocalUser> UsersLocal { get; set; }
    public DbSet<SleepLog> SleepLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<LocalUser>( p => {
            p.Property( p => p.Name)
                .IsRequired();
            p.HasMany( p => p.SleepLogs)
                .WithOne( p => p.User)
                .IsRequired();
        });

        modelBuilder.Entity<SleepLog>( p => {
            p.Property( p => p.StartDate)
                .IsRequired();
            p.Property( p => p.EndDate)
                .IsRequired();
        });
    }
}