import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SleepLog } from '../../models/sleep-logs';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLogCreateComponent } from '../../user/sleep-log-create/sleep-log-create.component';
import { SleepLogDetailsComponent } from '../../user/sleep-log-details/sleep-log-details.component';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SleepLogSessionComponent } from '../../user/sleep-log-session/sleep-log-session.component';

@Component({
  selector: 'app-sleep-logs-list-guest',
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
    MatCardModule,
    SleepLogSessionComponent,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sleep-logs-list-guest.component.html',
  styleUrl: './sleep-logs-list-guest.component.css'
})
export class SleepLogsListGuestComponent {

  columnsToDisplay = ['startDate', 'endDate', 'duration', 'comments', "details"];
  dataSource = new MatTableDataSource<SleepLog>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = true;
  
  constructor(
    private sleepLogService : SleepLogsService,
    public logDialog: MatDialog
  ) {}

  ngOnInit(): void {
   this.getLogs();
  }

  getLogs() {
    this.isLoading = true;
    this.sleepLogService.getLogsSample().subscribe( resp => {
      if(resp != null){
        this.isLoading = false;
        this.dataSource.data = resp.sleepLogs;
        this.paginator.length = resp.totalRecords;
      }
    });
  }

  openDetails(log: SleepLog): void {
    this.logDialog.open(SleepLogDetailsComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
      data: log
    }).afterClosed().subscribe(() => this.getLogs());
  }

  openCreate(): void {
    this.logDialog.open(SleepLogCreateComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
    }).afterClosed().subscribe(() => this.getLogs());
  }
}
