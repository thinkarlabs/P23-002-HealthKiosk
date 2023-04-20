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

  //url = "http://localhost:3000/profile";
  url = "http://127.0.0.1:8000/"
  constructor(private http: HttpClient) {}
  phoneRegRequest(data: Object): Observable<Object> {
    var apiUrl = this.url + "register";
    return this.http.post(apiUrl, data);
  }

  otpGenRequest(data: Object): Observable<Object> {
    var apiUrl = this.url + "login";
    return this.http.post(apiUrl, data);
  }

  getsun() {
    var apiUrl = this.url + "me";
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
    var apiUrl = this.url + "profile";
    var auth_token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth_token,
    });

    const requestOptions = { headers: headers };
    return this.http.get(apiUrl, requestOptions);

    //return this.http.get(apiUrl);
  }

  getProfile(data:any) {
    var apiUrl = this.url + "oneprofile";
    var auth_token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth_token,
    });

    const requestOptions = { headers: headers };
    return this.http.post(apiUrl, {'id':data}, requestOptions);

    //return this.http.get(apiUrl);
  }

  saveuser(data: any) {
    var apiUrl = this.url + "profile";
    var auth_token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth_token,
    });

    const requestOptions = { headers: headers };
    return this.http.post(apiUrl, data, requestOptions);
  }

  savedoctor(data: any) {
    var apiUrl = this.url + "doclogin";
    return this.http.post(apiUrl, data);
  }


  openaiResult(data: any) {
    var apiUrl = this.url + "predict";
    return this.http.post(apiUrl, { chat: data });
  }

  submitTranscript(data: any) {
    var apiUrl = this.url + "summary";
    return this.http.post(apiUrl, data);
  }

  // saveEpisodesummary(data: any){
  //   var apiUrl = this.url + "summary";
  //   return this.http.post(apiUrl, { chat: data });

  // }


}
