import { Component } from '@angular/core';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLog } from '../../models/sleep-logs';
import { NgFor, NgIf } from '@angular/common';
import { SleepLogCreateAdminComponent } from '../sleep-log-create-admin/sleep-log-create-admin.component';
import { SleepLogDetailsAdminComponent } from '../sleep-log-details-admin/sleep-log-details-admin.component';

@Component({
  selector: 'app-sleep-logs-list-admin',
  standalone: true,
  imports: [NgFor, NgIf, SleepLogCreateAdminComponent, SleepLogDetailsAdminComponent],
  templateUrl: './sleep-logs-list-admin.component.html',
  styleUrl: './sleep-logs-list-admin.component.css'
})
export class SleepLogsListAdminComponent {
  constructor(
    private sleepLogService : SleepLogsService
  ) {}

  index: number = 0;
  SleepLogs : SleepLog[] = [];
  SelectedLog? : SleepLog; 
  CreateLog : boolean = false;

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    this.sleepLogService.getAllLogs("", this.index).subscribe( resp => this.SleepLogs = resp);
  }

  nextPage() {
    this.index += 5;
    this.getLogs();
  }

  previousPage() {
    this.index -= 5;
    if( this.index < 0)
      this.index = 0
    this.getLogs();
  }

  setSleepLog(log: SleepLog) {
    this.SelectedLog = log;
  }

  closeCreate(event: any){
    this.CreateLog = false;
  }

  closeDetails(event: any){
    this.SelectedLog = undefined;
  }
}
