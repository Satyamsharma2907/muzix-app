import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { MoviesService } from '../services/movies.service';
import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  imageName1?:string = this.userService.imageName;
  image?:any = File;
  url?:any;
  status?: boolean = this.userService.imgStatus;
  img?: boolean = this.userService.image;
  color: string = "";

  constructor(private fb:FormBuilder, public userService:UserService, private routeService:RouteService, private movieService:MoviesService, private snackBar:MatSnackBar, private router:Router, private route: ActivatedRoute){ }

  ngOnInit(): void {
   // this.getImage();
    this.delImage();
    this.imgStatus();
    console.log(this.userService.userName);
    console.log(this.userService.userPassword);
    console.log(this.userService.userPhoneNo);
    console.log(this.userService.userEmail);
   
  }

  profileForm=this.fb.group({
    name:[this.userService.userName, [Validators.required, Validators.minLength(5)]],
    password:[this.userService.userPassword],
    phoneNo:[this.userService.userPhoneNo, [Validators.required]],
    email:[this.userService.userEmail]
    
  })
  
  get name(){
  //  console.log(this.userService.userName);
    return this.profileForm.get('name');
  }
  get phoneNo(){
    return this.profileForm.get('phoneNo');
  }
  get email(){
    return this.profileForm.get('email');
  }
  get password(){
    return this.profileForm.get('password');
  }

  onFileSelected(event:any){
    const image = event.target.files[0];
    this.image = image;
    const formData = new FormData();
    formData.append('image', this.image);

    this.userService.uploadImage(formData, this.userService.emailId).subscribe(
      (response)=>{
        this.userService.navprofile = false;
        this.userService.profile = false;
        console.log(this.userService.navprofile);
        console.log(this.userService.profile);
        this.userService.image = true;
        this.img = this.userService.image;
        console.log(response);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(event:any)=>{
        this.userService.imageName = event.target.result;
        this.imageName1 = this.userService.imageName;
       //  this.userService.userDetails?.email;
      //  this.userService.imageNameEmitter.emit();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate(['./'],{relativeTo:this.route})
      //  this.imageName1 = "../../assets/images/male_avatar.svg";
        this.routeService.navigateToProfileView();
      }
      }
    )
  }

  getImage() {
    // this.imageName1 = this.userService.emailId+".jpg";
    this.userService.displayImage(this.userService.emailId+".jpg").subscribe(
      response=>{
        this.url = response;
        this.imageName1 = this.url.url;
        console.log(response);
      }
    )
  }

  deleteImage() {
    this.userService.deleteImage(this.userService.emailId+".jpg").subscribe(
      response=>{
        console.log(response);
        this.userService.navprofile = true;
        this.userService.profile = true;
        console.log(this.userService.navprofile);
        console.log(this.userService.profile);
        this.imageName1 = "../../assets/images/male_avatar.svg";
       
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate(['./'],{relativeTo:this.route})
       
        
      }
    )
  }

  delImage() { 
    if(this.userService.profile)
    {
      this.userService.imageNameEmitter.emit();
      this.imageName1 = "../../assets/images/male_avatar.svg";
      this.userService.navprofile = true;
      this.userService.imageNameEmitter.emit();
     // this.userService.profile = true;
      console.log(this.userService.navprofile);
      console.log(this.userService.profile);
    }
  }

  imgStatus() {
    this.userService.imageStatus(this.userService.emailId).subscribe(
        (Response:any)=>{
            this.userService.imgStatus = Response;  
            this.status = this.userService.imgStatus;   
            console.log(this.status);
            if(!this.status)
            { 
            this.userService.image = true;
            this.img = this.userService.image
            this.imageName1 = "../../assets/images/male_avatar.svg";
            }
        }
    )
  }

  updateUserDetails() {
    this.movieService.updateUser(this.profileForm.value, this.userService.emailId).subscribe(
      response=>{
        console.log(response);
        this.openSnackBar();
      }
    )
  }

  openSnackBar(){
    this.snackBar.open('User details updated successfully', 'success', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-warn']   
        }) 
  }
}
