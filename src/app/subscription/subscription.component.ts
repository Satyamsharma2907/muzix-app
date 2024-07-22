import { AfterContentInit, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { UserService } from '../services/user.service';
import { Payment } from '../models/payment';
import { RouteService } from '../services/route.service';

declare var Razorpay: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, AfterContentInit {

  isSubscribed: boolean = false;
  chosenPlan: number = 0;
  chosenPlanDescription: string = "";
  color: string = "";
  
  plans: Array<any> = [
    {
      value: 100,
      bgColor: "#d8832f",
      description: "BRONZE level membership. View unlimited movies for a period of 1 month.",
    },
    {
      value: 600,
      bgColor: "#d9d9d9",
      description: "SILVER level membership. View unlimited movies for a period of 6 months."
    },
    {
      value: 1200,
      bgColor: "#fed766",
      description: "GOLD level membership. View unlimited movies for a period of 1 year."
    }
  ];

  constructor(private fb: FormBuilder, public userService: UserService, private paymentService: PaymentService, private routeService: RouteService){ }

  ngOnInit(): void {
    if (this.paymentService.userSubscription) {
      this.isSubscribed = this.paymentService.userSubscription.subscribed;
      this.chosenPlan = Number(this.paymentService.userSubscription.applicationFee);
    }
  }

  ngAfterContentInit(): void {
    this.getUserPlan();
    this.color = this.userService.chosenPlanColor;
  }

  subscriptionForm=this.fb.group({
    email:[this.userService.userEmail],
    amount:[]
  })

  get email(){
    return this.subscriptionForm.get('email');
  }

  get amount(){
    return this.subscriptionForm.get('amount');
  }

  paymentId: string = "";
  error: any;

  paymentDetails: Payment = {
    email: "",
    amount: 0
  };
  
  options = {
    "key": "",
    "amount": "", 
    "name": "Muzix",
    "description": "Web Development",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id":"",
    "handler": (response:any) =>{
      var event = new CustomEvent("payment.success", 
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );	  
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };
  
    onSubmit() {
      this.paymentId = ''; 
      this.error = '';
      this.paymentDetails = {
        email: this.userService.userEmail,
        amount: this.chosenPlan
      };
      console.log(this.paymentDetails);
      this.paymentService.createOrder(this.paymentDetails).subscribe(
      (data) => {
        console.log(data);
        this.paymentService.userSubscription = data;
        console.log(this.paymentService.userSubscription);
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = "Coding World";
        this.options.prefill.email = "codingworld@gmail.com";
        this.options.prefill.contact = "999999999";
        
        if(data.pgName ==='razor2') {
          this.options.image="";
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
        } else {
          var rzp2 = new Razorpay(this.options);
          rzp2.open();
        }

        rzp1.on('payment.failed',  (response:any) =>{    
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);    
          console.log(response.error.description);    
          console.log(response.error.source);    
          console.log(response.error.step);    
          console.log(response.error.reason);    
          console.log(response.error.metadata.order_id);    
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        }
        );
      }
      );
    }

    @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event:any): void {
        console.log(event.detail);
        this.paymentService.updateOrder(this.userService.emailId, this.paymentService.userSubscription).subscribe(
          (response)=>{
            this.isSubscribed = response.subscribed;
            this.getUserPlan();
            this.color = this.userService.chosenPlanColor;
            console.log(this.isSubscribed, "##Sub");
          }
        )
    }

    getUserPlan() {
      if (this.chosenPlan === 100) {
        this.userService.chosenPlanColor = "#d8832f";
        this.chosenPlanDescription = this.plans[0].description;
      } else if (this.chosenPlan === 600) {
        this.userService.chosenPlanColor = "#d9d9d9";
        this.chosenPlanDescription = this.plans[1].description;
      } else if (this.chosenPlan === 1200) {
        this.userService.chosenPlanColor = "#fed766";
        this.chosenPlanDescription = this.plans[2].description;
      }
      this.userService.chosenPlanColorEmitter.emit();
    }

    cancelSubscription() {
      this.paymentService.userSubscription.applicationFee = 0;
      this.paymentService.userSubscription.subscribed = false;
      this.paymentService.getUserColor();
      this.paymentService.updateOrder(this.userService.emailId, this.paymentService.userSubscription).subscribe(
        (response)=>{
          this.isSubscribed = response.subscribed;
          console.log(this.paymentService.userSubscription);
        }
      )
    }
}
