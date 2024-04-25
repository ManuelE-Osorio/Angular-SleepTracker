import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Account } from "./account";
import { BehaviorSubject, Observable, Subject, asyncScheduler, catchError, map, of, scheduled, tap } from "rxjs";
import { NotificationsService } from "./notifications.service";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
    ) { }

  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);

  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }

  // private baseUrl = 'https://localhost:7028/'
  private baseUrl = '/'

  // cookie-based login
  public logIn(account: Account) {
    console.log(account)
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}login?useCookies=true`, account, {
      observe: 'response'
    }).pipe(
      tap( {next: () => this.log(`Logged in succesfully`, `success`)}),
      catchError( this.logError<HttpResponse<any>>(false)),
      map( (res) => {
        if(res.status == 200){
          this._authStateChanged.next(true)
        }
        return res
    }));
      // map((res: HttpResponse<string>) => {
      //   this._authStateChanged.next(res.ok);
      //   return res.ok;
      // })
  }


    // sign out
  public logOut() {
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}logout`, {}, {
      withCredentials: true,
      observe: 'response',
      responseType: 'json'
    }).pipe(
      tap( {next: () => this.log(`Logged out succesfully`, `success`)}),
      catchError( this.logError<HttpResponse<any>>(true)),
      map( (res) => {
        if( res.status == 200){
          this._authStateChanged.next(false);
        }
        return res;
      })
      // map((res: HttpResponse<string>) => {
      // if (res.ok) {
      //   this._authStateChanged.next(false);
      // }
      // return res.ok;})
      );    
  }


  // register new user
  // public register(email: string, password: string) {
  //   return this.http.post('/register', {
  //     email: email,
  //     password: password
  //   }, {
  //     observe: 'response',
  //     responseType: 'text'
  //   })
  //     .pipe<boolean>(map((res: HttpResponse<string>) => {
  //       return res.ok;
  //     }));
  // }

  // check if the user is authenticated. the endpoint is protected so 401 if not.
  // public user() {
  //   return this.http.get<Account>('/manage/info', {
  //     withCredentials: true
  //   }).pipe(
  //     catchError((_: HttpErrorResponse, __: Observable<Account>) => {
  //       return of({} as Account);
  //     }));
  // }

  // is signed in when the call completes without error and the user has an email
  // public isSignedIn(): Observable<boolean> {
  //   return this.user().pipe(
  //     map((userInfo) => {
  //       const valid = !!(userInfo && userInfo.userName && userInfo.userName.length > 0);
  //       return valid;
  //     }),
  //     catchError((_) => {
  //       return of(false);
  //     }));
  // }

  private log(message: string, type: string) {
    this.notificationService.add( message, type);
  }

  private logError<T>( status: boolean){
    return (error: any): Observable<T> => {
      this._authStateChanged.next(status);
      this.log(`Unable to complete operation, please try again later. Error code: ${error.status}`, 'error');
      return scheduled([[] as T], asyncScheduler);
    };
  }
}