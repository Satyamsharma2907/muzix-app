import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileComponent } from '../profile/profile.component';
import { MoviesService } from '../services/movies.service';
import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';
import { mustMatchValidator } from '../validators/mustMatch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder, private snackBar:MatSnackBar, private moviesService: MoviesService, private routeService: RouteService, private userService: UserService){ }

  registerForm=this.fb.group({
    name:['',[Validators.required, Validators.minLength(5)]],
    phoneNo:['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
  }, { validators: mustMatchValidator })

  get name(){
    return this.registerForm.get('name');
  }
  get phoneNo(){
    return this.registerForm.get('phoneNo');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword');
  }
  
  openSnackBar(){
    this.snackBar.open('Congrats, you have registered successfully!!', 'success', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']   
        }) 
  }
  //console.log(this.moviesService.userName);
  registerUser() {
    this.userService.userEmail = this.registerForm.value.email!;
    this.moviesService.registerUser(this.registerForm.value).subscribe(
      response=>{
        this.moviesService.userName = this.registerForm.value.name!;
        
        console.log(response);
        console.log(this.moviesService.userName);
        this.openSnackBar();
        this.routeService.navigateToLoginView();
      }
    )
  }

  resetForm() {
    this.registerForm.reset();
  }

}
