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
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sleep-logs-list',
  standalone: true,
  imports: [
    NgFor, 
    NgIf, 
    SleepLogCreateComponent, 
    SleepLogDetailsComponent, 
    MatTableModule, 
    MatProgressBarModule, 
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sleep-logs-list.component.html',
  styleUrl: './sleep-logs-list.component.css'
})
export class SleepLogsListComponent implements OnInit{

  columnsToDisplay = ['startDate', 'endDate', 'duration', 'comments', "details"];
  dataSource = new MatTableDataSource<SleepLog>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = true;

  constructor(
    private sleepLogService : SleepLogsService,
    public logDialog: MatDialog
  ) {}


  ngOnInit(): void {
   this.getLogs(0);
  }

  getLogs( startIndex: number, date?: string) {
    this.isLoading = true;
    this.sleepLogService.getLogs( startIndex, date).subscribe( resp => {
      if(resp != null){
        this.isLoading = false;
        this.dataSource.data = resp.sleepLogs;
        this.paginator.length = resp.totalRecords;
      }
    });
  }

  onChangePage(event: PageEvent) {
    this.getLogs(event.pageIndex*event.pageSize); 
  }

  openDetails(log: SleepLog): void {
    this.logDialog.open(SleepLogDetailsComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
      data: log
    }).afterClosed().subscribe(() => this.getLogs(this.paginator.pageIndex*this.paginator.pageSize));
  }

  openCreate(): void {
    this.logDialog.open(SleepLogCreateComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
    }).afterClosed().subscribe(() => this.getLogs(this.paginator.pageIndex*this.paginator.pageSize));
  }
}
