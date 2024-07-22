import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userName?:string;
  public userPassword?:string;
  public userPhoneNo?:string;
  public userEmail?:string;
  public userDetails?: User;
  public emailId: string = "";
  public loggedIn?: boolean = false;
  public imageName?:string = "../../assets/images/male_avatar.svg";
  private chosenPlanColorValue: string = "";
  public navprofile?:boolean = false;
  public profile?:boolean = false;
  public image?:boolean = false;
  public imgStatus?:boolean = false;
  public imageNameEmitter: EventEmitter<void> = new EventEmitter<void>();
  public chosenPlanColorEmitter: EventEmitter<void> = new EventEmitter<void>();
  public loginEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(public httpClient:HttpClient) { }

  base_url:string="http://localhost:65001/api/authservice";

  get chosenPlanColor(): string {
    return this.chosenPlanColorValue;
  }

  set chosenPlanColor(color: string) {
    this.chosenPlanColorValue = color;
  }

  addUser(data:any) {
    // call backend register controller method --> data to register
    return this.httpClient.post(this.base_url+"/register", data);
  }

  login(data:any) {
    // call backend login controller method --> data to login
    return this.httpClient.post(this.base_url+"/login", data);
  }

  getUser(email:string): Observable<User> {
    return this.httpClient.get(this.base_url+"/use/"+email) as Observable<User>;
  }

  uploadImage(data:FormData, email:string) {
    return this.httpClient.post(this.base_url+"/file/upload/"+email, data);
  }

  displayImage(imageName:string) {
    return this.httpClient.get(this.base_url+"/images/"+imageName);
  }

  deleteImage(imageName:string) {
    return this.httpClient.delete(this.base_url+"/files/"+imageName);
  }

  imageStatus(email:any) {
    return this.httpClient.post(`${this.base_url}/file/status/${email}`,email);
  }

  getImageNav()
  {

  }
  getStatus()
  {
    
  }
}
