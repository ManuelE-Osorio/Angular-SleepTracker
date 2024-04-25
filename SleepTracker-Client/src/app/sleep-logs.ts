export interface SleepLog {
    id: number;
    startDate: Date;
    endDate: Date;
    comments: string;
    userId: string;
}

export interface NotificationMessage{
    message : string;
    type: string;
  }