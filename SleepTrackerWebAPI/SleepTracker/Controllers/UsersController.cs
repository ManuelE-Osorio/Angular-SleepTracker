using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Data;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace SleepTracker.Controllers;

[ApiController]
[ApiConventionType(typeof(DefaultApiConventions))]
[Route("api/users")]
[Authorize]
public class UsersController(SleepTrackerContext context) : Controller
{
    private readonly SleepTrackerContext DBContext = context;
    
    [HttpGet]
    public async Task<IResult> GetAllUsers()
    {
        if (DBContext.UsersLocal == null)
            return TypedResults.Problem("Entity set 'Users'  is null.");

        var query = from m in DBContext.UsersLocal select m ;  //filter by name

        return TypedResults.Ok(await query.Select( p => new UserDto (p))
            .ToListAsync());
    }
}