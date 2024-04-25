import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './notifications.component.html'
})

export class NotificationsComponent {

  constructor(public notificationService: NotificationsService) {}
}
