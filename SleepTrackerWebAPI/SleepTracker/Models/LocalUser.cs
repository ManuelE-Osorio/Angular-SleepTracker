using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace SleepTracker.Models;

public class LocalUser : IdentityUser
{
    public string? Name { get; set; }
}