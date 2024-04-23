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
using Microsoft.Extensions.Options;
using SleepTracker.Models;
using Microsoft.AspNetCore.Identity.Data;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.WebUtilities;

namespace SleepTracker;

public class SleepTracker
{
    public static void Main( string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddAuthorization();
        builder.Services.AddControllers();
        builder.Services.AddSwaggerGen();
        builder.Services.AddIdentityApiEndpoints<LocalUser>()
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

        using (var context = new SleepTrackerContext( 
            app.Services.CreateScope().ServiceProvider.GetRequiredService<DbContextOptions<SleepTrackerContext>>()))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                var sp = app.Services.CreateScope().ServiceProvider;
                SeedData.SeedUser(context, sp).GetAwaiter().GetResult();
                SeedData.SeedLogs(context);
            }

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseCors("AllowAnyOrigin");
        app.MapControllers();
        app.MapIdentityApi<LocalUser>();
        app.MapSwagger();
        app.Run();
    }
}

