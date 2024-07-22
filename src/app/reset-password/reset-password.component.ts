import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from '../services/email.service';
import { MoviesService } from '../services/movies.service';
import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';
import { mustMatchValidator } from '../validators/mustMatch.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  constructor(private fb:FormBuilder, private snackBar:MatSnackBar, private moviesService: MoviesService, private routeService: RouteService, private userService: UserService, private emailService: EmailService){ }

  ngOnInit(): void {
    this.getUserData();
  }

  resetPasswordForm=this.fb.group({
    password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
  }, { validators: mustMatchValidator })

  get password(){
    return this.resetPasswordForm.get('password');
  }
  get confirmPassword(){
    return this.resetPasswordForm.get('confirmPassword');
  }

  openSnackBar(){
    this.snackBar.open('Password Updated Successfully!!', 'success', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-warn']   
        }) 
  }

  getUserData() {
    this.userService.getUser(this.emailService.emailId).subscribe(
      (response)=>{
        this.emailService.userData = {
          email: response.email,
          password: response.password,
          name: response.name,
          phoneNo: response.phoneNo
        }
      }
    )
  }

  updateUserData() {
    this.emailService.userData.password = this.resetPasswordForm.value.password as string;
    this.moviesService.updateUser(this.emailService.userData, this.emailService.emailId).subscribe(
      (response)=>{
        console.log(response);
        this.openSnackBar();
      }
    )
    this.routeService.navigateToLoginView();
  }

}
