import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public userName?: string;
  public movies?: Movie;
  userMovies: Array<Movie> = [];
   
  constructor(private httpClient:HttpClient) { }

 base_url:string="http://localhost:65001/api/movieservice";

  registerUser(data:any) {
    // call backend register controller method --> data to register
    console.log(data)
    return this.httpClient.post(this.base_url+"/register", data);
  }

  updateUser(data:any, email:string) {
    //let n:number = 34;
    let httpHeaders = new HttpHeaders({
      'Authorization' : 'Bearer ' +localStorage.getItem("jwttoken")
    });
    let requestOption = {headers : httpHeaders}
    return this.httpClient.put(this.base_url+"/update/"+email, data, requestOption);
  }
  
  addMoviesToUser(data:any, email:string) {
    // call backend register controller method --> data to register
    let httpHeaders = new HttpHeaders({
      'Authorization' : 'Bearer ' +localStorage.getItem("jwttoken")
    });
    let requestOption = {headers : httpHeaders}
    console.log(email)
    console.log(data)
    return this.httpClient.post(this.base_url+"/user/"+email, data, requestOption);
    }

    getAllMoviedetails(email:string){
      return this.httpClient.get(this.base_url+"/user/"+email);
    }

    getMovieStatus(data:any,email:string) {
      let httpHeaders = new HttpHeaders({
        'Authorization' : 'Bearer ' +localStorage.getItem("jwttoken")
      });
      let requestOption = {headers : httpHeaders}
      return this.httpClient.post(this.base_url+"/status/"+email,data,requestOption);
    }

    updateMovie(data:any,email:string) {
      let httpHeaders = new HttpHeaders({
        'Authorization' : 'Bearer ' +localStorage.getItem("jwttoken")
      });
      let requestOption = {headers : httpHeaders}
      return this.httpClient.put(this.base_url+"/updates/"+email,data,requestOption);
    }

    addFavouriteMovie(data:any,email:string) { 
      let httpHeaders = new HttpHeaders({
        'Authorization' : 'Bearer ' +localStorage.getItem("jwttoken")
      });
      let requestOption = {headers : httpHeaders}
      return this.httpClient.post(this.base_url+"/add/"+email,data,requestOption);
    }

    deleteUserFavourite(email:string, mid:number) {
      let httpHeaders = new HttpHeaders({
        'Authorization' : 'Bearer ' +localStorage.getItem("jwttoken")
      });
      let requestOption = {headers : httpHeaders}
      return this.httpClient.put(this.base_url+"/favourites/"+email+"/"+mid, mid, requestOption);
    }

}
