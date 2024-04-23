namespace SleepTracker.Models;

public class UserDto( LocalUser user)
{
    // public int? Id {get; set;} = user.Id;
    public string? Name { get; set; } = user.Name;
}