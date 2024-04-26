export interface SleepLog {
    id: number;
    startDate: Date;
    endDate: Date;
    duration: string;
    comments: string;
    userName: string;
}

export interface NotificationMessage{
    message : string;
    type: string;
  }