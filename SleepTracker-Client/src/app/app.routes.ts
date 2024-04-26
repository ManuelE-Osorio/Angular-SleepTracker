import { Routes, provideRouter } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';
import { AdminComponent } from './admin/admin/admin.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SleepLogsListAdminComponent } from './admin/sleep-logs-list-admin/sleep-logs-list-admin.component';
import { LogInComponent } from './authorization/log-in/log-in.component';
import { UserComponent } from './user/user/user.component';
import { SleepLogsListComponent } from './user/sleep-logs-list/sleep-logs-list.component';
import { SleepLogCreateComponent } from './user/sleep-log-create/sleep-log-create.component';
import { SleepLogDetailsComponent } from './user/sleep-log-details/sleep-log-details.component';

export const routes: Routes = [
    
    {path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', component: SleepLogsListAdminComponent }
    ]
    },

    { path: 'login', component: LogInComponent},

    { path: 'user', component: UserComponent,
    canActivate: [userGuard],
    children: [
      { path: '', component: SleepLogsListComponent},
      { path: 'create', component: SleepLogCreateComponent},
      { path: 'details', component: SleepLogDetailsComponent}
    ]
    },
    
];
