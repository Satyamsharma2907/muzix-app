import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public userSubscription!: Subscription;

  constructor(private httpClient:HttpClient, private userService: UserService) { }

  base_url:string="http://localhost:65001/api/paymentservice";

  createOrder(data:any): Observable<any> {
    // call backend register controller method --> data to register
    return this.httpClient.post(this.base_url+"/subscribe", data);
  }

  updateOrder(email:any, data:any): Observable<Subscription> {
    return this.httpClient.put(this.base_url+"/status/"+email, data);
  }

  getOrder(email:any): Observable<Subscription> {
    return this.httpClient.get(this.base_url+"/subscription/"+email);
  }

  getUserSubscription() {
    this.getOrder(this.userService.emailId).subscribe(
      (response)=>{
        response.applicationFee = response.applicationFee ? Number(response.applicationFee) : 0;
        this.userSubscription = response;
        this.getUserColor();
        console.log(this.userSubscription);
      }
    )
  }

  getUserColor() {
    if (this.userSubscription.applicationFee === 100) {
      this.userService.chosenPlanColor = "#d8832f";
    } else if (this.userSubscription.applicationFee === 600) {
      this.userService.chosenPlanColor = "#d9d9d9";
    } else if (this.userSubscription.applicationFee === 1200) {
      this.userService.chosenPlanColor = "#fed766";
    } else {
      this.userService.chosenPlanColor = "#fff";
    }
    this.userService.chosenPlanColorEmitter.emit();
  }
}
