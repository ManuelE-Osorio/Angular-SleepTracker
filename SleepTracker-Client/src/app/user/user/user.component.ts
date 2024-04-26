import { Component } from '@angular/core';
import { SleepLogSessionComponent } from '../sleep-log-session/sleep-log-session.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet, 
    SleepLogSessionComponent,
    RouterLink,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
