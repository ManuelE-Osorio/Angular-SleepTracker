using System.Collections.Generic;

namespace SleepTracker.Models;

public class LocalUser
{
    public int? Id {get; set;}
    public string? Name { get; set; }
    public List<SleepLog>? SleepLogs { get; set; }
}