import { Component, ViewChild } from '@angular/core';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLog } from '../../models/sleep-logs';
import { NgFor, NgIf } from '@angular/common';
import { SleepLogCreateAdminComponent } from '../sleep-log-create-admin/sleep-log-create-admin.component';
import { SleepLogDetailsAdminComponent } from '../sleep-log-details-admin/sleep-log-details-admin.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sleep-logs-list-admin',
  standalone: true,
  imports: [
    NgFor, 
    NgIf, 
    SleepLogCreateAdminComponent, 
    SleepLogDetailsAdminComponent, 
    MatTableModule, 
    MatProgressBarModule, 
    MatPaginatorModule,
    MatIconModule
  ],
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

  columnsToDisplay = ['startDate', 'endDate', 'duration', 'comments', "userName", "details"];
  dataSource = new MatTableDataSource<SleepLog>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = true;
  totalData: number = 0;

  ngOnInit(): void {
    this.getLogs(0);
  }

  getLogs(startIndex: number, date?: string) {
    this.isLoading = true;
    this.sleepLogService.getAllLogs( startIndex, date).subscribe( resp => {
      this.isLoading = false;
      this.dataSource.data = resp.sleepLogs;
      this.paginator.length = resp.totalRecords
      });
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

  onChangePage(event: PageEvent) {
    this.getLogs(event.pageIndex*event.pageSize); 
  }
}
