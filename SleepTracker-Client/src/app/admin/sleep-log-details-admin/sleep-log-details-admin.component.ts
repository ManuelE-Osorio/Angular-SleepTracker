import { NgIf, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SleepLogForm, SleepLog } from '../../models/sleep-logs';
import { SleepLogsService } from '../../services/sleep-logs.service';

@Component({
  selector: 'app-sleep-log-details-admin',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sleep-log-details-admin.component.html',
  styleUrl: './sleep-log-details-admin.component.css'
})
export class SleepLogDetailsAdminComponent {
  form : FormGroup<SleepLogForm> = new FormGroup<SleepLogForm>({
    id: new FormControl<number>(0, {nonNullable: true, validators: [
      Validators.required, Validators.min(1), Validators.max(2147483647), Validators.pattern("^[0-9]*$")
    ]} ),
    startDate: new FormControl<string>(new Date().toLocaleDateString(), {nonNullable: true, validators: Validators.required}),
    endDate: new FormControl<string>(new Date().toLocaleDateString(), {nonNullable: true, validators: Validators.required}),
    comments: new FormControl<string | undefined>('', {nonNullable: true}),
  });

  @Input() sleepLog: SleepLog = {};
  @Output() closed = new EventEmitter();

  constructor (
    private sleepLogService : SleepLogsService
  ) {}

  submitForm(){

    if(this.form.valid){
      this.sleepLog = Object.assign(this.form.value);
      this.sleepLogService.putLog(this.sleepLog).subscribe( res => this.sleepLog = res)
    }
  }

  ngOnInit(): void {
    this.setForm();
  }

  ngOnChanges(): void {
    this.setForm();
  }

  update() {
    if(this.sleepLog != undefined){
      this.sleepLogService.putLog(this.sleepLog).subscribe()
    }
    
  }

  delete() {
    if(this.sleepLog.id != undefined){
      this.sleepLogService.deleteLog(this.sleepLog.id).subscribe()
    }
  }

  setForm() {
    if (this.sleepLog != undefined){
      this.form.controls.id!.setValue(this.sleepLog.id!)
      this.form.controls.startDate.setValue(formatDate(this.sleepLog.startDate!, 'yyyy-MM-ddTHH:mm', 'en'))
      this.form.controls.endDate.setValue(formatDate(this.sleepLog.endDate!, 'yyyy-MM-ddTHH:mm', 'en'))
      this.form.controls.comments.setValue(this.sleepLog.comments)
    }  
  }

  close() {
    this.closed.emit();
  }
}
