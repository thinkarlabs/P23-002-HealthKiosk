import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) {}
  getdata() {
    let url="http://127.0.0.1:8000/me";
    return this.http.get(url);

  }
}
