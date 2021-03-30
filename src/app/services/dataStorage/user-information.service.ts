
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  constructor(private http: HttpClient) { }
  // public readonly userData$: Observable<IUserData> = this._userData$.asObservable()
  // .pipe(skipWhile(data => data === undefined || data === null));


  // private _userData$ = new BehaviorSubject<IUserData>(undefined);



  UserInformation = new BehaviorSubject(null);
  private privateUserInformation: any

  public setUserInformation(data: any) {
    this.privateUserInformation = data
    //   this.UserInformation.next(this.privateUserInformation)
    // return this.UserInformation
  }

  public submitApplication(requestBody: any) {
    return this.http.post(`https://run.mocky.io/v3/c1f515aa-75c1-4370-9cd9-88d6a5e99168`, requestBody);
  }





}
