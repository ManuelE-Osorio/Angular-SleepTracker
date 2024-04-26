import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, provideRouter } from '@angular/router';
import { LogInComponent } from './authorization/log-in/log-in.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LogOutComponent } from './authorization/log-out/log-out.component';
import { routes } from './app.routes';
import { AdminComponent } from './admin/admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LogInComponent, NotificationsComponent, LogOutComponent, RouterLinkActive, AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = "SleepTracker-Client"
  constructor() {}

}
