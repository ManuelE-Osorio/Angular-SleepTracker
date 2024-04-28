import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SleepLog, SleepLogForm } from '../../models/sleep-logs';
import { SleepLogsService } from '../../services/sleep-logs.service';

@Component({
  selector: 'app-sleep-log-create',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sleep-log-create.component.html',
  styleUrl: './sleep-log-create.component.css'
})
export class SleepLogCreateComponent{
  @Output() closed = new EventEmitter();

  sleepLog: SleepLog = {};
  
  form : FormGroup<SleepLogForm> = new FormGroup<SleepLogForm>({
    startDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    endDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    comments: new FormControl<string | undefined>(' ', {nonNullable: true})
  });

  constructor(
    private sleeplogService : SleepLogsService,
  ) {}

  submitForm(){
    if(this.form.valid){
      this.sleepLog = Object.assign(this.form.value);
      this.sleeplogService.postLog(this.sleepLog).subscribe( () => this.close())
    } 
  }

  close() {
    this.closed.emit();
  }
}
