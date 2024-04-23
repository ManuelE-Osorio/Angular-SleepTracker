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

namespace SleepTracker.Controllers;

[ApiController]
[ApiConventionType(typeof(DefaultApiConventions))]
[Route("api/sleeplogs")]
[Authorize]
public class SleepLogsController(SleepTrackerContext context, UserManager<LocalUser> userManager) : Controller
{
    private readonly SleepTrackerContext DBContext = context;
    private readonly UserManager<LocalUser> UserManager = userManager;
    
    [HttpGet]
    public async Task<IResult> GetAllLogs(string? date)
    {
        if (DBContext.Users == null)
            return TypedResults.Problem("Entity set 'Users'  is null.");

        var user = UserManager.GetUserId(User);

        var query = from m in DBContext.SleepLogs 
            where m.User!.Id == user //filter by user
            select m ;  
        
        if( DateTime.TryParse( date, out DateTime dateResult))
            query = query.Where( p => p.StartDate == dateResult);

        return TypedResults.Ok(await query.Select( p => new SleepLogDto(p)).ToListAsync());
    }

}