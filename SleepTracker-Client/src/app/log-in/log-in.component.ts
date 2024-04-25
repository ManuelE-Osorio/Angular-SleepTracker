import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { Account, AccountForm } from '../account';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
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
  ){}

  logIn(account: Account){
    this.authenticationService.logIn(account).subscribe( resp => {
      if( resp.status == 200){
        console.log(resp);
        this.loggedIn = true;
      }
      else{
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

  // check() {
  //   this.authenticationService.
  // }

  ngOnInit(): void {
  }
}
