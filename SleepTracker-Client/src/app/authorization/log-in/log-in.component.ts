import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { Account, AccountForm } from '../../models/account';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonModule,
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
  
  form : FormGroup<AccountForm> = new FormGroup<AccountForm>({
    email: new FormControl<string>('', {nonNullable: true, validators: [
      Validators.required, Validators.email
    ]}),
    password: new FormControl<string>('', {nonNullable: true, validators: [
      Validators.required
    ]})
  });

  loggedIn: boolean = false;
  logInFailed: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,  
    public dialogRef: MatDialogRef<LogInComponent>  
  ){}

  logIn(account: Account){
    this.authenticationService.logIn(account).subscribe( resp => {
      if( resp.status == 200){
        this.loggedIn = true;
        this.dialogRef.close();
      }
      else{
        console.log("failes");
        this.logInFailed = true;
      }
    })
  }

  submitForm(){
    if(this.form.valid){
      let account: Account ;
      account = Object.assign(this.form.value);
      this.logIn(account);
    }
  }

  logOut() {
    this.authenticationService.logOut().subscribe( resp => {
      console.log(resp)
      if( resp.status == 200){
        this.loggedIn = false;
        this.logInFailed = false;
      }
    });
  }

  ngOnInit(): void {
    this.authenticationService.isLoggedIn()
      .subscribe( resp => this.loggedIn = resp)
  }
}
