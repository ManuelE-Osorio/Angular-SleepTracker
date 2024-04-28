import { FormControl } from "@angular/forms";

export interface SleepLog {
    id?: number;
    startDate?: string;
    endDate?: string;
    duration?: string;
    comments?: string;
    userName?: string;
}

export interface SleepLogForm {
    id: FormControl<number>;
    startDate: FormControl<string>;
    endDate: FormControl<string>;
    comments: FormControl<string | undefined>;
    username?: FormControl<string>;
}

export interface NotificationMessage{
    message : string;
    type: string;
}

export function DateToDuration(log: SleepLog) : string {
    let hours = 0;
    let minutes = 0;
    let milliseconds = new Date(log.endDate!).valueOf() - new Date(log.startDate!).valueOf();
    hours = Math.floor(milliseconds/(60*60*1000))
    minutes = (Math.floor(milliseconds/(60 * 1000))-hours*60);

    return `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}`;
}