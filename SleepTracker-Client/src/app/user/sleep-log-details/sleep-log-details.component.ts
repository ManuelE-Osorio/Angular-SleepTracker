import { Component, OnInit } from '@angular/core';
import { SleepLogsListComponent } from '../sleep-logs-list/sleep-logs-list.component';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLog } from '../../models/sleep-logs';

@Component({
  selector: 'app-sleep-log-details',
  standalone: true,
  imports: [],
  templateUrl: './sleep-log-details.component.html',
  styleUrl: './sleep-log-details.component.css'
})
export class SleepLogDetailsComponent  {


}
