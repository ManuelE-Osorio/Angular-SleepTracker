namespace SleepTracker.Models;

public class LocalUserDto( LocalUser user)
{
    public string? Id {get; set;} = user.Id;
    public string? Name { get; set; } = user.Name;
}