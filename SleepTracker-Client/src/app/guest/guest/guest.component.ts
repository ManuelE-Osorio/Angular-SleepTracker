import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { SleepLogSessionComponent } from '../../user/sleep-log-session/sleep-log-session.component';
import { SleepLogsListComponent } from '../../user/sleep-logs-list/sleep-logs-list.component';
import { SleepLogsListGuestComponent } from '../sleep-logs-list-guest/sleep-logs-list-guest.component';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    RouterOutlet, 
    SleepLogSessionComponent,
    RouterLink,
    MatGridListModule,
    SleepLogsListComponent,
    NotificationsComponent,
    MatDividerModule,
    SleepLogsListGuestComponent
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent {

}
