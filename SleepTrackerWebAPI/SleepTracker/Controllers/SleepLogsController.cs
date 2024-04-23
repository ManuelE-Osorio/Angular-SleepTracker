using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Data;
using System;
using Microsoft.AspNetCore.Http;

namespace SleepTracker.Controllers;

[ApiController]
[ApiConventionType(typeof(DefaultApiConventions))]
[Route("api/sleeplogs")]
public class SleepLogsController(SleepTrackerContext context) : Controller
{
    private readonly SleepTrackerContext DBContext = context;
    
    [HttpGet]
    public async Task<IResult> GetAllLogs(string? date)
    {
        if (DBContext.Users == null)
            return TypedResults.Problem("Entity set 'Users'  is null.");

        var query = from m in DBContext.SleepLogs 
            where m.User!.Id == "1" //filter by user
            select m ;  
        
        if( DateTime.TryParse( date, out DateTime dateResult))
            query = query.Where( p => p.StartDate == dateResult);

        return TypedResults.Ok(await query.Select( p => new SleepLogDto(p)).ToListAsync());
    }

}