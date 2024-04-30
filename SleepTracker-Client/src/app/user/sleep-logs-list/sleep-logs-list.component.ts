import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLog } from '../../models/sleep-logs';
import { NgFor, NgIf } from '@angular/common';
import { SleepLogDetailsComponent } from '../sleep-log-details/sleep-log-details.component';
import { SleepLogCreateComponent } from '../sleep-log-create/sleep-log-create.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { catchError, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-sleep-logs-list',
  standalone: true,
  imports: [NgIf, NgFor, SleepLogDetailsComponent, SleepLogCreateComponent, MatTableModule, MatPaginatorModule, MatProgressBarModule],
  templateUrl: './sleep-logs-list.component.html',
  styleUrl: './sleep-logs-list.component.css'
})
export class SleepLogsListComponent implements OnInit, AfterViewInit{

  constructor(
    private sleepLogService : SleepLogsService
  ) {}

  index: number = 0;
  SleepLogs : SleepLog[] = [];
  SelectedLog? : SleepLog; 
  CreateLog : boolean = false;
  columnsToDisplay = ['startDate', 'endDate', 'duration', 'comments'];
  dataSource = new MatTableDataSource<SleepLog>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = true;
  totalData: number = 0;

  ngOnInit(): void {
   
  }

  getLogs( startIndex: number, date?: string) {
    this.isLoading = true;
    this.sleepLogService.getLogs( startIndex, date).subscribe( resp => {
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

  ngAfterViewInit() {
    this.getLogs(0);
  }

  onChangePage(event: PageEvent) {
    this.getLogs(event.pageIndex*event.pageSize); 
  }
}
