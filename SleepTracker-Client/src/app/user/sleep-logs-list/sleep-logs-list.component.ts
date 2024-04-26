import { Component, OnInit } from '@angular/core';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLog } from '../../models/sleep-logs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-sleep-logs-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './sleep-logs-list.component.html',
  styleUrl: './sleep-logs-list.component.css'
})
export class SleepLogsListComponent implements OnInit {

  constructor(
    private sleepLogService : SleepLogsService
  ) {}

  index: number = 0;
  SleepLogs : SleepLog[] = [];

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    this.sleepLogService.getLogs("", this.index).subscribe( resp => this.SleepLogs = resp);
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

}
