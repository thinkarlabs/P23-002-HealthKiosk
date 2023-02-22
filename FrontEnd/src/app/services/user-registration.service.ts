import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  users() {
    throw new Error('Method not implemented.');
  }
url='http://localhost:8000/register';
  constructor(private http:HttpClient) { 
    
  }
  saveuser(data:any){
    return this.http.post(this.url,data)

  }
}
