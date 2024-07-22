import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { EmailService } from '../services/email.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  userOtp: number = 0;
  flag: boolean = false;

  constructor(private fb:FormBuilder, private emailService: EmailService, private routeService: RouteService){ }

  verificationForm=this.fb.group({
    email:['', [Validators.required]]
  })

  get email(){
    return this.verificationForm.get('email');
  }

  otpForm = this.fb.group({
    otp:[0, [Validators.required]]
  })

  get otp(){
    return this.otpForm.get('otp');
  }

  @ViewChild('cd', { static: false })
  private countdown!: CountdownComponent;

  sendOtp() {
    this.flag = true;
    this.countdown.begin();
    this.emailService.createOtp(this.verificationForm.value.email!).subscribe(
      (response:any)=>{
        console.log(response);
        this.userOtp = response;
      }
    )
    this.emailService.emailId = this.verificationForm.value.email!;
    console.log(this.emailService.emailId);
  }

  confirmOtp() {
    if (this.otpForm.value.otp == this.userOtp) {
      this.routeService.navigateToResetPasswordView();
    }
  }

  config: CountdownConfig = {
    leftTime: 60,
    demand: true,
    format: 'mm : ss'
  };

  // handleEvent(e: CountdownEvent) {
  //   console.log('Actions', e);
  // }

}
