import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  getMovieDetailResult:any;
  getMovieVideoResult:any;
  getMovieCastResult:any;
  getRecommendationResult:any;
  status?:boolean = false;
  apiLoaded:boolean = false;
  trailer:boolean = false;
  isSubscribed: boolean = this.paymentService.userSubscription.subscribed;
  chosenPlan: number = this.paymentService.userSubscription.applicationFee;
  color: string = "";

  constructor(private tmdbService:TmdbService, private router:ActivatedRoute, private moviesService:MoviesService, private userService:UserService, private snackBar:MatSnackBar, private paymentService: PaymentService) { }

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');
    console.log("satyam");
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
    this.getRecommendation(getParamId);
    this.getYoutubeFrame();
  }

  getMovie(id:any) {
    this.tmdbService.getMovieDetails(id).subscribe((result)=>{
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = result;
    });
  }

  getVideo(id:any) {
    this.tmdbService.getMovieVideo(id).subscribe((result)=>{
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element:any)=>{
        if(element.type == "Trailer") {
          this.getMovieVideoResult = element.key;
          this.trailer = false;
        }
      })
    })
  }

  getYoutubeFrame() {
    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  getMovieCast(id:any) {
    this.tmdbService.getMovieCast(id).subscribe((result)=>{
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    })
  }

  getRecommendation(id:any) {
    this.tmdbService.getRecommendations(id).subscribe((result)=>{
      console.log(result, 'recommendation#');
      this.getRecommendationResult = result.results;
    })
  }

  updateList(id:any) {
    this.getMovie(id);
    this.getMovieCast(id);
    this.getRecommendation(id);
    this.getVideo(id);
  }

  addMovie() {
    this.moviesService.movies = {
      id: this.getMovieDetailResult.id,
      original_title: this.getMovieDetailResult.original_title,
      overview: this.getMovieDetailResult.overview,
      release_date: this.getMovieDetailResult.release_date,
      vote_average: this.getMovieDetailResult.vote_average
    }
    console.log('add movie ')
    console.log(this.moviesService.movies);
    this.moviesService.addMoviesToUser(this.moviesService.movies, this.userService.emailId).subscribe(
      response=>{
        console.log(response);
        this.trailer = true;
      }
    );
  }

  openSnackBar(){
    this.snackBar.open('Movie added to Favourites', 'success', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-warn']   
        }) 
  }

  addFavourite() {
    this.moviesService.movies = {
      id: this.getMovieDetailResult.id,
      original_title: this.getMovieDetailResult.original_title,
      overview: this.getMovieDetailResult.overview,
      release_date: this.getMovieDetailResult.release_date,
      vote_average: this.getMovieDetailResult.vote_average,
      isFavourite:true
    }
    console.log('add movie ')
    console.log(this.moviesService.movies);
      this.moviesService.getMovieStatus(this.moviesService.movies,this.userService.emailId).subscribe(
          (resp:any)=>{
            this.status = resp;
            console.log(this.status);
            console.log(resp);
            if(!this.status)
            {
              this.moviesService.updateMovie(this.moviesService.movies,this.userService.emailId).subscribe(
                (resp:any)=>
                {
                    console.log(resp);
                    this.openSnackBar();
                }
              )
            }
            else
            {
              this.moviesService.addFavouriteMovie(this.moviesService.movies,this.userService.emailId).subscribe(
                (resp:any)=>
                {
                    console.log(resp);
                    this.openSnackBar();
                }
              )
            }
          }
      )
  }

  getMovieDetails(){
    this.moviesService.getAllMoviedetails(this.userService.emailId).subscribe(
    resp=>{
      console.log('response')
    console.log(resp);
    });
  }
}