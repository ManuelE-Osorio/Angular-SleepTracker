import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SleepLogsListComponent } from '../sleep-logs-list/sleep-logs-list.component';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLog, SleepLogForm } from '../../models/sleep-logs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, formatDate } from '@angular/common';

@Component({
  selector: 'app-sleep-log-details',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sleep-log-details.component.html',
  styleUrl: './sleep-log-details.component.css'
})
export class SleepLogDetailsComponent implements OnInit, OnChanges {

  form : FormGroup<SleepLogForm> = new FormGroup<SleepLogForm>({
    id: new FormControl<number>(0, {nonNullable: true, validators: [
      Validators.required, Validators.min(1), Validators.max(2147483647), Validators.pattern("^[0-9]*$")
    ]} ),
    startDate: new FormControl<string>(new Date().toLocaleDateString(), {nonNullable: true, validators: Validators.required}),
    endDate: new FormControl<string>(new Date().toLocaleDateString(), {nonNullable: true, validators: Validators.required}),
    comments: new FormControl<string>('', {nonNullable: true})
  });

  @Input() sleepLog?: SleepLog;

  constructor (
    private sleepLogService : SleepLogsService
  ) {}

  submitForm(){

  }

  ngOnInit(): void {
    this.setForm();
  }

  ngOnChanges(): void {
    this.setForm();
  }

  delete() {
    if(this.sleepLog != undefined){
      this.sleepLogService.deleteLog(this.sleepLog.id!).subscribe(this.sleepLog = undefined)
    }
  }

  setForm() {
    if (this.sleepLog != undefined){
      this.form.controls.id.setValue(this.sleepLog.id!)
      this.form.controls.startDate.setValue(formatDate(this.sleepLog.startDate, 'yyyy-MM-dd', 'en'))
      this.form.controls.endDate.setValue(formatDate(this.sleepLog.endDate, 'yyyy-MM-dd', 'en'))
      this.form.controls.comments.setValue(this.sleepLog.comments)
    }  
  }

  cancel() {
    this.sleepLog = undefined;
  }
}
