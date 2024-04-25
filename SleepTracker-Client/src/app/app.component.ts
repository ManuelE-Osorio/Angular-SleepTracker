import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LogOutComponent } from './log-out/log-out.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogInComponent, NotificationsComponent, LogOutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SleepTracker-Client';
}
