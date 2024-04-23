using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SleepTracker.Models;

public class SleepLog
{
    public int? Id { get; set; }

    [Required]
    public DateTime? StartDate { get; set; }

    [Required]
    public DateTime? EndDate { get; set; }
    public string? Comments { get; set; }
    public IdentityUser? User {get; set;}
}