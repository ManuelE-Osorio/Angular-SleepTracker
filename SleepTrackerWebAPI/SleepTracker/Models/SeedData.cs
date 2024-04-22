using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SleepTracker.Models;

namespace CoffeeTracker.Models;

public class SeedData
{
    public static async Task<bool> SeedSleepLogs( SleepTrackerContext context, IServiceProvider sp)
    {
        if(context.Users.Any())
            return false;


        


        var userManager = sp.GetRequiredService<UserManager<IdentityUser>>();

            if (!userManager.SupportsUserEmail)
            {
                throw new NotSupportedException($"{nameof(MapIdentityApi)} requires a user store with email support.");
            }

            var userStore = sp.GetRequiredService<IUserStore<IdentityUser>>();
            var emailStore = (IUserEmailStore<IdentityUser>)userStore;
            var email = "test@thecsharpacademy.com";



            var user = new IdentityUser();
            await userStore.SetUserNameAsync(user, email, CancellationToken.None);
            await emailStore.SetEmailAsync(user, email, CancellationToken.None);
            var result = await userManager.CreateAsync(user, "Test1234");




        var defaultUser = new User { Name = "Admin", SleepLogs = []};
        defaultUser.SleepLogs.AddRange([
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 22, 22, 0, 0),
                EndDate = new DateTime( 2024, 4, 23, 8, 30, 0),
                Comments = "Well rested"
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 21, 23, 15, 0),
                EndDate = new DateTime( 2024, 4, 22, 7, 22, 0),
                Comments = "Nightmares"
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 20, 23, 30, 0),
                EndDate = new DateTime( 2024, 4, 21, 8, 25, 0),
                Comments = "Bad Sleep"
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 19, 20, 40, 0),
                EndDate = new DateTime( 2024, 4, 20, 6, 50, 0),
                Comments = "Well rested"
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 18, 23, 40, 0),
                EndDate = new DateTime( 2024, 4, 19, 7, 15, 0),
                Comments = "Well rested"
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 17, 22, 35, 0),
                EndDate = new DateTime( 2024, 4, 18, 8, 20, 0),
                Comments = "Waking up in the middle of the night"
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 16, 19, 55, 0),
                EndDate = new DateTime( 2024, 4, 17, 6, 0, 0),
                Comments = "Dehydrated"
            }
        ]);

        context.UsersLocal.Add( defaultUser); 
        context.SaveChanges();
    }
}