using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Data;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage;
using System.Collections.Generic;

namespace SleepTracker.Controllers;

[ApiController]
[ApiConventionType(typeof(DefaultApiConventions))]
[Route("api/sleeplogs")]
public class SleepLogsController(SleepTrackerContext context, UserManager<IdentityUser> userManager) : Controller
{
    private readonly SleepTrackerContext _context = context;
    private readonly UserManager<IdentityUser> _userManager = userManager;
    
    [HttpGet]
    [Route("all")]
    [Authorize(Roles = "Admin")]
    public async Task<IResult> GetAllLogs(string? date, int? startIndex, int? pageSize)
    {
        if (_context.Users == null)
            return TypedResults.Problem("Entity set 'Users'  is null.");

        var query = from m in _context.SleepLogs.Include( p => p.User ) 
            select m ;  
            
        query = query.OrderByDescending( p => p.StartDate);
        
        if( DateTime.TryParse( date, out DateTime dateResult))
            query = query.Where( p => p.StartDate!.Value.Date == dateResult.Date);

        var totalRecords = query.Count();
        query = query.Skip(startIndex ?? 0).Take(pageSize ?? 5);

        var pageData = new SleepLogAdminDtoPageData(
            await query.Select(p => new SleepLogAdminDto(p)).ToListAsync())
        {
            TotalRecords = totalRecords,
            CurrentPage = (startIndex ?? 0) / (pageSize ?? 5),
            PageSize = pageSize ?? 5,
            TotalPages = (int)Math.Ceiling((double)(totalRecords / (pageSize ?? 5)))
        };


        return TypedResults.Ok(pageData);
    }

    [HttpGet]
    [Authorize(Roles = "Admin, User")]
    public async Task<IResult> GetLogs(string? date, int? startIndex, int? pageSize) 
    {
        if (_context.Users == null)
            return TypedResults.Problem("Entity set 'Users'  is null.");

        var user = _userManager.GetUserId(User);

        var query = from m in _context.SleepLogs 
            where m.User!.Id == user
            select m ;  

        query = query.OrderByDescending( p => p.StartDate);
        
        if( DateTime.TryParse( date, out DateTime dateResult))
            query = query.Where( p => p.StartDate!.Value.Date == dateResult.Date);


        var totalRecords = query.Count();

        query = query.Skip(startIndex ?? 0).Take(pageSize ?? 5);

        var pageData = new SleepLogDtoPageData(
            await query.Select(p => new SleepLogDto(p)).ToListAsync())
        {
            TotalRecords = totalRecords,
            CurrentPage = (startIndex ?? 0) / (pageSize ?? 5),
            PageSize = pageSize ?? 5,
            TotalPages = (int)Math.Ceiling((double)(totalRecords / (pageSize ?? 5)))
        };

        return TypedResults.Ok(pageData);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin, User")]
    public async Task<IResult> GetLog(int id)
    {
        if (_context.Users == null)
            return TypedResults.Problem("Entity set 'Users'  is null.");

        SleepLog? log;

        if( User.IsInRole("Admin"))
            log = await _context.SleepLogs.Where( p => p.Id == id).FirstOrDefaultAsync();
        else
        {
            var user = await _userManager.GetUserAsync(User);        
            log = await _context.SleepLogs.Where( p => p.User == user && p.Id == id).FirstOrDefaultAsync(); 
        }

        if( log is null)
            return TypedResults.NotFound();

        return TypedResults.Ok( new SleepLogDto(log));
    }

    [HttpPost]
    [Consumes("application/json")]
    [Authorize(Roles = "Admin, User")]
    public async Task<IResult> CreateLog( [FromBody] SleepLog log, string? userId)
    {
        if ( !ModelState.IsValid)
            return TypedResults.BadRequest();

        if( User.IsInRole("Admin") && userId is not null)
        {
            log.User = await _userManager.FindByNameAsync(userId);
            if( log.User is null)
            {
                return TypedResults.BadRequest();
            }
        }   
        else
            log.User = await _userManager.GetUserAsync(User);

        _context.SleepLogs.Add(log);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch
        {
            return TypedResults.StatusCode(500);
        }

        return TypedResults.Created($"/{log.Id}", new SleepLogDto(log));
    }

    [HttpPut("{id}")]
    [Consumes("application/json")]
    [Authorize(Roles = "Admin, User")]
    public async Task<IResult> UpdateLog( int id, [FromBody] SleepLog log )
    {
        if(!ModelState.IsValid || id != log.Id)
            return TypedResults.BadRequest();

        var userLog = _context.SleepLogs.Include( p => p.User)
            .Where( p => p.Id == id).Select(p => p.User!.Id).FirstOrDefault();

        if( userLog is null)
            return TypedResults.NotFound();

        var user = _userManager.GetUserId(User);

        if( user == userLog || User.IsInRole("Admin"))
        {    
            _context.SleepLogs.Update(log);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return TypedResults.StatusCode(500);
            }

            return TypedResults.Ok(new SleepLogDto(log));
        }
        else
            return TypedResults.Unauthorized();
    }

    [HttpDelete("{id}")]
    [Consumes("application/json")]
    [Authorize(Roles = "Admin, User")]
    public async Task<IResult> DeleteLog( int id) 
    {
        var log = await _context.SleepLogs.FindAsync( id );
        if( log is null)
            return TypedResults.NotFound();

        var userLog = _context.SleepLogs.Include( p => p.User)
            .Where( p => p.Id == id).Select(p => p.User!.Id).FirstOrDefault();

        if( userLog is null)
            return TypedResults.NotFound();

        var user = _userManager.GetUserId(User);

        if( user == userLog || User.IsInRole("Admin"))
        {
            _context.SleepLogs.Remove(log);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return TypedResults.StatusCode(500);
            }

            return TypedResults.Ok();
        }
        else
            return TypedResults.Unauthorized();
    }

    [HttpGet]
    [Route("sample")]
    public IResult GetSampleData()
    {
        return TypedResults.Ok(new SleepLogDtoPageData(
            [
                new SleepLogDto { 
                    Id = 0,
                    StartDate = new DateTime(2024, 4, 22, 22, 0, 0),
                    EndDate = new DateTime( 2024, 4, 23, 8, 30, 0),
                    Comments = "Well rested"
                },
                new SleepLogDto { 
                    Id = 1,
                    StartDate = new DateTime(2024, 4, 21, 23, 15, 0),
                    EndDate = new DateTime( 2024, 4, 22, 7, 22, 0),
                    Comments = "Nightmares"
                },
                new SleepLogDto { 
                    Id = 2,
                    StartDate = new DateTime(2024, 4, 20, 23, 30, 0),
                    EndDate = new DateTime( 2024, 4, 21, 8, 25, 0),
                    Comments = "Bad Sleep"
                },
                new SleepLogDto { 
                    Id = 3,
                    StartDate = new DateTime(2024, 4, 19, 20, 40, 0),
                    EndDate = new DateTime( 2024, 4, 20, 6, 50, 0),
                    Comments = "Well rested"
                },
                new SleepLogDto { 
                    Id = 4,
                    StartDate = new DateTime(2024, 4, 18, 23, 40, 0),
                    EndDate = new DateTime( 2024, 4, 19, 7, 15, 0),
                    Comments = "Well rested"
                }
            ]
        )
        {
            TotalRecords = 5,
            CurrentPage =  0,
            PageSize = 5,
            TotalPages = 1
        });
    }
}