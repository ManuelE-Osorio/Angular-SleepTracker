using System;

namespace SleepTracker.Models;

public class SleepLog
{
    public int? Id { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Comments { get; set; }
    public LocalUser? User {get; set;}
}