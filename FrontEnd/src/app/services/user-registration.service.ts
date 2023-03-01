import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  users() {
    throw new Error('Method not implemented.');
  }
url='http://127.0.0.1:8000/profile';
  constructor(private http:HttpClient) { 
    
  }
  saveuser(data:any){
    return this.http.post(this.url,data)

  }

}
