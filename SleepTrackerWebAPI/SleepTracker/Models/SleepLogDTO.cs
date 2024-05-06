using System;

namespace SleepTracker.Models;

public class SleepLogDto
{
    public int? Id { get; set; }
    public DateTime? StartDate { get; set; } 
    public DateTime? EndDate { get; set; } 
    public string? Comments { get; set; } 

    public SleepLogDto()
    {

    }

    public SleepLogDto(SleepLog log)
    {
        Id = log.Id;
        StartDate = log.StartDate;
        EndDate = log.EndDate;
        Comments = log.Comments;
    }
}