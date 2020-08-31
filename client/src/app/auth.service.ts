import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;
  private logData = null;

  constructor(private http: HttpClient) { }

  setLoggedIn(values: boolean) {

    this.loggedInStatus = values;

  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  setLoggedInData(userData: Object) {

    this.logData = userData;

  }

  get loggedInData() {

    return this.logData;

  }


}
