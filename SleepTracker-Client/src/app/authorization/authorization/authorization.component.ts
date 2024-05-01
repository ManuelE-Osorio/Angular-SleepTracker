import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AccountDto } from '../../models/account';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LogOutComponent } from '../log-out/log-out.component';
import { LogInComponent } from '../log-in/log-in.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatButtonModule,
    LogOutComponent,
    LogInComponent
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent implements OnInit{

  constructor(
    private authenticationService: AuthenticationService,
    public logInDialog: MatDialog
  ) {}

  isLoggedIn : boolean = false;
  UserInfo: AccountDto | null = null;

  ngOnInit(): void {
    this.authenticationService.isLoggedIn().subscribe( resp => {
      this.isLoggedIn = resp
      if(resp){
        this.authenticationService.getInfo().subscribe( resp => this.UserInfo = resp)
      }
    })
  }

  logInDialogOpen() {
    this.logInDialog.open(LogInComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
    })
  }
}
