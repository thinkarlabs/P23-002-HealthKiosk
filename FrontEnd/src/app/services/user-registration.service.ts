import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class UserRegistrationService {
  users() {
    throw new Error("Method not implemented.");
  }

  url = "http://localhost:3000/profile";
  constructor(private http: HttpClient) {}
  phoneRegRequest(data: Object): Observable<Object> {
    var apiUrl = "http://127.0.0.1:3000/register1";
    return this.http.post(apiUrl, data);
  }

  otpGenRequest(data: Object): Observable<Object> {
    var apiUrl = "http://127.0.0.1:3000/login";
    return this.http.post(apiUrl, data);
  }

  getsun() {
    var apiUrl = "http://127.0.0.1:3000/me";
    var auth_token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth_token,
    });
    //var headers= {"Authorization": 'Bearer ' + localStorage.getItem('token')};
    const requestOptions = { headers: headers };
    return this.http.get(apiUrl, requestOptions);

    //return this.http.get(apiUrl);
  }

  getProfiles() {
    var apiUrl = "http://127.0.0.1:3000/profile";
    var auth_token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth_token,
    });

    const requestOptions = { headers: headers };
    return this.http.get(apiUrl, requestOptions);

    //return this.http.get(apiUrl);
  }

  saveuser(data: any) {
    var apiUrl = "http://127.0.0.1:3000/profile";
    var auth_token = localStorage.getItem("token");
    debugger;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth_token,
    });

    const requestOptions = { headers: headers };
    return this.http.post(apiUrl, data, requestOptions);
  }

  openaiResult(data: any) {
    var apiUrl = "http://127.0.0.1:3000/predict";
    return this.http.post(apiUrl, { chat: data });
  }
}
