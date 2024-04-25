import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { Account, AccountForm } from '../account';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent implements OnInit{
  
  loggedIn: boolean = false;
  logInFailed: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,    
  ){}

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
  }
}
