import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, asyncScheduler, catchError, scheduled, tap, throwError } from 'rxjs';
import { SleepLog } from './sleep-logs';
import { query } from '@angular/animations';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class SleepLogsService {

  private baseUrl = "https://localhost:7245/api/sleeplogs";

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}

  getAllLogs(date?: string, startIndex: number = 0) : Observable<HttpResponse<SleepLog[]>> {
    
    let options = new HttpParams();
    
    options = date? options.set('date', date) : options;
    options = startIndex? options.set('startIndex', startIndex) : options;

    return this.http.get<SleepLog[]>(`${this.baseUrl}/all`, {
      observe: 'response',
      responseType: 'json',
      withCredentials: true,
      params: options
    }).pipe(
      tap( {next: () => this.log(`Items fetched succesfully`, `success`)}),
      catchError(this.logError<HttpResponse<SleepLog[]>>())
    );
  }

  getLogs(date?: string, startIndex: number = 0) : Observable<HttpResponse<SleepLog[]>> {
    
    let options = new HttpParams();
    
    options = date? options.set('date', date) : options;
    options = startIndex? options.set('startIndex', startIndex) : options;

    return this.http.get<SleepLog[]>(`${this.baseUrl}`, {
      observe: 'response',
      responseType: 'json',
      withCredentials: true,
      params: options
    }).pipe(
      tap( {next: () => this.log(`Items fetched succesfully`, `success`)}),
      catchError(this.logError<HttpResponse<SleepLog[]>>())
    );
  }

  getLog( id: number) : Observable<HttpResponse<SleepLog>> {
    return this.http.get<SleepLog>( `${this.baseUrl}/${id}`, {
      observe: 'response',
      responseType: 'json',
      withCredentials: true
    }).pipe(
      tap( {next: () => this.log(`Item fetched succesfully`, 'success')}),
      catchError(this.logError<HttpResponse<SleepLog>>())
    );
  }

  postLog( log: SleepLog, userdId: string) : Observable<HttpResponse<SleepLog>> {
    let options = new HttpParams();
    
    options = userdId? options.set('userId', userdId) : options;

    return this.http.post<SleepLog>(`${this.baseUrl}`, log, {
      observe: 'response',
      responseType: 'json',
      withCredentials: true,
      params: options
    }).pipe(
      tap( {next: () => this.log(`Item created succesfully`, 'success')}),
      catchError( this.logError<HttpResponse<SleepLog>>())
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

  deleteLog( id: number ) : Observable<HttpResponse<SleepLog>> {
    return this.http.delete<SleepLog>( `${this.baseUrl}/${id}`, {
      observe: 'response',
      responseType: 'json',
      withCredentials: true
    }).pipe(
      tap( {next: () => this.log(`Item deleted succesfully`, 'success')}),
      catchError( this.logError<HttpResponse<SleepLog>>() )
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
