import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  img1?: boolean = this.userService.image;
  status?: boolean = this.userService.imgStatus;
  isSubscribed: boolean = false;
  chosenPlan: number = 0;

  @Input()
  imageName1:any = "";

  @Input()
  color: string = "";

  constructor(public userService:UserService, private routeService:RouteService, private paymentService: PaymentService, private router:Router, private route: ActivatedRoute) {}

  ngOnInit():void {
    this.getImageName();
    this.imgStatus();
  }
  
  
  getImageName() {
  
    {
      if(this.userService.navprofile) {
        this.imageName1 = "../../assets/images/male_avatar.svg";
       this.userService.image = true;
       this.img1 = this.userService.image;
      // this.userService.imageNameEmitter.emit();
        // this.userService.profile = true;
        // this.userService.navprofile = false;
      }
      else {
        this.imageName1 = this.userService.imageName;
      this.userService.image = true;
        this.img1 = this.userService.image;
       // this.img1 = this.userService.image;
      }
    }
   
  }
  
  imgStatus() {
  
    {
    this.userService.imageStatus(this.userService.emailId).subscribe(
      (Response:any)=>{
        this.userService.imgStatus = Response;  
        this.status = this.userService.imgStatus;
        console.log(this.status);
        console.log(Response); 
        if(!this.status) {
        this.userService.image = true;
        this.img1 = this.userService.image;
        this.imageName1 = "../../assets/images/male_avatar.svg";
        }
      }
    )
    }
  }

  getUserPlan() {
    if (this.chosenPlan === 100) {
      this.color = "#d8832f";
    }
    else if (this.chosenPlan === 600) {
      this.color = "#d9d9d9";
    }
    else if (this.chosenPlan === 1200) {
      this.color = "#fed766";
    }
  }

  getValue() {
    if (this.userService.loggedIn) {
      this.isSubscribed = this.paymentService.userSubscription.subscribed;
      this.chosenPlan = this.paymentService.userSubscription.applicationFee;
      console.log(this.isSubscribed);
      console.log(this.chosenPlan);
      this.getUserPlan();
    }
  }

  logout() {
    localStorage.removeItem("jwttoken");
    this.userService.loggedIn = false;
    this.userService.image = false;
    this.img1 = false;
    this.routeService.navigateToHomeView();
    console.log(localStorage.getItem("jwttoken"));
  }
}
