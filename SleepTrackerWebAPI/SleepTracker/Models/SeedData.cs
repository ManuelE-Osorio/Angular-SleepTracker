using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Client;
using SleepTracker.Models;

namespace CoffeeTracker.Models;

public class SeedData
{
    public static async Task<bool> SeedUser( SleepTrackerContext context, IServiceProvider sp)
    {
        if(context.Users.Any())
            return false;


        


        var userManager = sp.GetRequiredService<UserManager<LocalUser>>();
        var userStore = sp.GetRequiredService<IUserStore<LocalUser>>();
        var emailStore = (IUserEmailStore<LocalUser>)userStore;
        var email = "test@thecsharpacademy.com";
        var user = new LocalUser();
        await userStore.SetUserNameAsync(user, email, CancellationToken.None);
        await emailStore.SetEmailAsync(user, email, CancellationToken.None);
        await userManager.CreateAsync(user, "Test1234");
        context.SaveChanges();
        return true;
    }

    public static void SeedLogs( SleepTrackerContext context)
    {
        var user = context.Users.FirstOrDefault();

        context.SleepLogs.AddRange([
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 22, 22, 0, 0),
                EndDate = new DateTime( 2024, 4, 23, 8, 30, 0),
                Comments = "Well rested",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 21, 23, 15, 0),
                EndDate = new DateTime( 2024, 4, 22, 7, 22, 0),
                Comments = "Nightmares",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 20, 23, 30, 0),
                EndDate = new DateTime( 2024, 4, 21, 8, 25, 0),
                Comments = "Bad Sleep",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 19, 20, 40, 0),
                EndDate = new DateTime( 2024, 4, 20, 6, 50, 0),
                Comments = "Well rested",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 18, 23, 40, 0),
                EndDate = new DateTime( 2024, 4, 19, 7, 15, 0),
                Comments = "Well rested",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 17, 22, 35, 0),
                EndDate = new DateTime( 2024, 4, 18, 8, 20, 0),
                Comments = "Waking up in the middle of the night",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 16, 19, 55, 0),
                EndDate = new DateTime( 2024, 4, 17, 6, 0, 0),
                Comments = "Dehydrated",
                User = user
            }
        ]);

        context.SaveChanges();
    }
}