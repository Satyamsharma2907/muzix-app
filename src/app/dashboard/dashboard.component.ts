import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { Movie } from '../models/movie';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // r:any;
  // i:number = 0;
  color: string = "";
  
  trendingResult:any = [];
  actionMovieResult:any = [];
  adventureMovieResult:any = [];
  animationMovieResult:any = [];
  comedyMovieResult:any = [];
  documentaryMovieResult:any = [];
  sciencefictionMovieResult:any = [];
  thrillerMovieResult:any = [];

  constructor(private tmdbService:TmdbService, private userService:UserService, private paymentService: PaymentService) { }

  ngOnInit():void {
    this.trendingData();
    this.actionMovie();
    this.adventureMovie();
    this.animationMovie();
    this.comedyMovie();
    this.documentaryMovie();
    this.sciencefictionMovie();
    this.thrillerMovie();
    this.getUserDetails();
    this.paymentService.getUserSubscription();
    this.color = this.userService.chosenPlanColor;
  }

  trendingData() {
    this.tmdbService.trendingApiData().subscribe((result)=>{
      var r:any;
      var i:number = 0;
      for(r in result.results) {
        if(result.results[r].media_type=="movie") {
          console.log(result.results[r], 'trendingresult#');
          this.trendingResult[i] = result.results[r];
          i++;
        }
      }
    });
  }

  actionMovie() {
    this.tmdbService.fetchActionMovies().subscribe((result)=>{
      this.actionMovieResult = result.results;
    });
  }

  adventureMovie() {
    this.tmdbService.fetchAdventureMovies().subscribe((result)=>{
      this.adventureMovieResult = result.results;
    });
  }

  animationMovie() {
    this.tmdbService.fetchAnimationMovies().subscribe((result)=>{
      this.animationMovieResult = result.results;
    });
  }

  comedyMovie() {
    this.tmdbService.fetchComedyMovies().subscribe((result)=>{
      this.comedyMovieResult = result.results;
    });
  }

  documentaryMovie() {
    this.tmdbService.fetchDocumentaryMovies().subscribe((result)=>{
      this.documentaryMovieResult = result.results;
    });
  }

  sciencefictionMovie() {
    this.tmdbService.fetchSciencefictionMovies().subscribe((result)=>{
      this.sciencefictionMovieResult = result.results;
    });
  }

  thrillerMovie() {
    this.tmdbService.fetchThrillerMovies().subscribe((result)=>{
      this.thrillerMovieResult = result.results;
    });
  }

  getUserDetails() {
    this.userService.getUser(this.userService.emailId).subscribe(
      (response: User) => {
        console.log(response);
        this.userService.userEmail = response.email;
        this.userService.userPassword = response.password;
        this.userService.userName = response.name;
        this.userService.userPhoneNo = response.phoneNo;
      }
    )
  }
}
