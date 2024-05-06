using System;
using CoffeeTracker.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SleepTracker.Models;

namespace SleepTracker;

public class SleepTracker
{
    public static void Main( string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddAuthorization();
        builder.Services.AddControllers();
        builder.Services.AddSwaggerGen();
        builder.Services.AddIdentityApiEndpoints<IdentityUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<SleepTrackerContext>();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        builder.Services.AddDbContext<SleepTrackerContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("SleepTrackerConnectionString") ?? 
                throw new InvalidOperationException("Connection string 'SleepTracker' not found.")));
        

        builder.Services.Configure<IdentityOptions>( p => {
            p.Password.RequireNonAlphanumeric = false;
        });

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "AllowAnyOrigin",
                policy  =>
                {
                    policy.AllowAnyOrigin();
                    policy.AllowAnyMethod();
                    policy.AllowAnyHeader();
                });
        });

        var app = builder.Build();

        using (var context = app.Services.CreateScope()
            .ServiceProvider.GetRequiredService<SleepTrackerContext>())
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                var serviceProvider = app.Services.CreateScope().ServiceProvider;
                SeedData.SeedUser(serviceProvider).GetAwaiter().GetResult();
                SeedData.SeedLogs(serviceProvider);
            }

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.MapControllers();
        app.MapIdentityApi<IdentityUser>();
        app.MapSwagger();
        app.UseCors("AllowAnyOrigin");
        app.Run();
    }
}

