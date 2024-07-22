import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public emailId: string = "";
  public userData!: User;

  constructor(private httpClient:HttpClient) { }

  base_url:string="http://localhost:65001/api/emailservice";

  createOtp(email:string) {
    return this.httpClient.post(this.base_url+"/sendOtp/"+email, email);
  }
}
