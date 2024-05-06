import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { Account, AccountForm } from '../../models/account';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-create-account',
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
    MatDialogContent,
    MatCardModule,
    MatGridListModule,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent implements OnInit{

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
    private router: Router,
    private authenticationService: AuthenticationService,  
  ) {}

  ngOnInit(): void {
    
  }

  submitForm(){
    if(this.form.valid){
      let account: Account ;
      account = Object.assign(this.form.value);
      this.create(account);
    }
  }

  create(account: Account){
    this.authenticationService.register(account).subscribe( resp => {
      if(resp == true){
        this.router.navigate(['signin']);
      }
    })
  }

}
