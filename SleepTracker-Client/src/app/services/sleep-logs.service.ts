import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, asyncScheduler, catchError, map, scheduled, tap, throwError } from 'rxjs';
import { DateToDuration, SleepLog } from '../models/sleep-logs';
import { query } from '@angular/animations';
import { NotificationsService } from './notifications.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SleepLogsService {

  private baseUrl = "/api/sleeplogs";

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}

  getAllLogs(date?: string, startIndex: number = 0) : Observable<SleepLog[]> {
    
    let options = new HttpParams();
    
    options = date? options.set('date', date) : options;
    options = startIndex? options.set('startIndex', startIndex) : options;

    return this.http.get<SleepLog[]>(`${this.baseUrl}/all`, {
      responseType: 'json',
      withCredentials: true,
      params: options
    }).pipe(
      tap( {next: () => this.log(`Items fetched succesfully`, `success`)}),
      catchError(this.logError<SleepLog[]>()),
      map( logs => logs.map( log => {
        log.duration = DateToDuration(log);
        log.startDate = formatDate(new Date(log.startDate!), 'yyyy-MM-dd, HH:mm', 'en');
        log.endDate = formatDate(new Date(log.endDate!), 'yyyy-MM-dd, HH:mm', 'en');
        return log;
      }))
    );
  }

  getLogs(date?: string, startIndex: number = 0) : Observable<SleepLog[]> {
    
    let options = new HttpParams();
    
    options = date? options.set('date', date) : options;
    options = startIndex? options.set('startIndex', startIndex) : options;

    return this.http.get<SleepLog[]>(`${this.baseUrl}`, {
      responseType: 'json',
      withCredentials: true,
      params: options
    }).pipe(
      tap( {next: () => this.log(`Items fetched succesfully`, `success`)}),
      catchError(this.logError<SleepLog[]>()),
      map( logs => logs.map( log => {
        log.duration = DateToDuration(log);
        log.startDate = formatDate(new Date(log.startDate!), 'yyyy-MM-dd, HH:mm', 'en');
        log.endDate = formatDate(new Date(log.endDate!), 'yyyy-MM-dd, HH:mm', 'en');
        return log;
      }))
    );
  }

  getLog( id: number) : Observable<SleepLog> {
    return this.http.get<SleepLog>( `${this.baseUrl}/${id}`, {
      responseType: 'json',
      withCredentials: true
    }).pipe(
      tap( {next: () => this.log(`Item fetched succesfully`, 'success')}),
      catchError(this.logError<SleepLog>()),
      map( log => {
        log.duration = DateToDuration(log);
        log.startDate = formatDate(new Date(log.startDate!), 'yyyy-MM-dd, HH:mm', 'en');
        log.endDate = formatDate(new Date(log.endDate!), 'yyyy-MM-dd, HH:mm', 'en');
        return log;
      })
    );
  }

  postLog( log: SleepLog, userdId: string = '') : Observable<SleepLog> {
    let options = new HttpParams();
    
    options = userdId? options.set('userId', userdId) : options;

    return this.http.post<SleepLog>(`${this.baseUrl}`, log, {
      responseType: 'json',
      withCredentials: true,
      params: options
    }).pipe(
      tap( {next: () => this.log(`Item created succesfully`, 'success')}),
      catchError( this.logError<SleepLog>()),
      map( log => {
        log.duration = DateToDuration(log);
        log.startDate = formatDate(new Date(log.startDate!), 'yyyy-MM-dd, HH:mm', 'en');
        log.endDate = formatDate(new Date(log.endDate!), 'yyyy-MM-dd, HH:mm', 'en');
        return log;
      })
    );
  }

  putLog( log: SleepLog ) : Observable<HttpResponse<SleepLog>> {
    return this.http.put<SleepLog>( `${this.baseUrl}/${log.id}`, log, {
      observe: 'response',
      responseType: 'json',
      withCredentials: true,
    }).pipe(
      tap( {next: () => this.log(`Item modified succesfully`, 'success')}),
      catchError( this.logError<HttpResponse<SleepLog>>())
    );
  }

  deleteLog( id: number ) : Observable<SleepLog> {
    return this.http.delete<SleepLog>( `${this.baseUrl}/${id}`, {
      responseType: 'json',
      withCredentials: true
    }).pipe(
      tap( {next: () => this.log(`Item deleted succesfully`, 'success')}),
      catchError( this.logError<SleepLog>() )
    );
  }

  private log(message: string, type: string) {
    this.notificationService.add( message, type);
  }

  private logError<T>( ){
    return (error: any): Observable<T> => {
      this.log(`Unable to complete operation, please try again later. Error code: ${error.status}`, 'error');
      return scheduled([[] as T], asyncScheduler);
    };
  }
}
