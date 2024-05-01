import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, provideRouter } from '@angular/router';
import { LogInComponent } from './authorization/log-in/log-in.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LogOutComponent } from './authorization/log-out/log-out.component';
import { routes } from './app.routes';
import { AdminComponent } from './admin/admin/admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AuthorizationComponent } from './authorization/authorization/authorization.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    LogInComponent, 
    NotificationsComponent, 
    LogOutComponent, 
    RouterLinkActive, 
    AdminComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AuthorizationComponent,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = "SleepTracker-Client"
  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer) 
    {
      iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/github.svg'));
      iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/linkedin.svg'));
    }

    showFiller = false;
}
