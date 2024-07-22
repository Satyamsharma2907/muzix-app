import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../services/payment.service';
import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  resdata:any;
  color: string = "";

  constructor(private fb:FormBuilder, private snackBar:MatSnackBar, private userService:UserService, private routeService:RouteService, private paymentService: PaymentService){ }

  loginForm=this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]],
  })

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  
  openSnackBar(){
    this.snackBar.open('Login Successfull!!', 'success', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-warn']   
        }) 
  }

  loginCheck() {
    this.userService.login(this.loginForm.value).subscribe(
      response=>{
        console.log(response);  // message + token
        this.resdata=response;
        console.log(this.resdata.token);
        localStorage.setItem("jwttoken", this.resdata.token);
        this.openSnackBar();
        if(this.resdata.token) {
          this.userService.userDetails = {
            email: this.loginForm.value.email!,
            password: this.loginForm.value.password!
          };
      //    console.log(this.userService.)
          this.userService.emailId = this.loginForm.value.email!;
          console.log(this.userService.userDetails.email);
          console.log(this.userService.userName);
          console.log(this.userService.userPassword);
          console.log(this.userService.userEmail);
          console.log(this.userService.userEmail);
          console.log(this.userService.userDetails);
          this.userService.loggedIn = true;
          this.userService.loginEmitter.emit();
        }
        this.routeService.navigateToDashboardView();
        this.paymentService.getUserSubscription();
        this.color = this.userService.chosenPlanColor;
      }
    )
  }

}
