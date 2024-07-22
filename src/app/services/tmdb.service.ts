import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private httpClient:HttpClient) { }

  base_url:string = "https://api.themoviedb.org/3";
  api_key:string = "a9b696d6505db101f3024680daaf83bf";

  trendingApiData():Observable<any> {
    return this.httpClient.get(`${this.base_url}/trending/all/week?api_key=${this.api_key}`);
  }

  fetchActionMovies():Observable<any> {
    return this.httpClient.get(`${this.base_url}/discover/movie?api_key=${this.api_key}&with_genres=28`);
  }

  fetchAdventureMovies():Observable<any> {
    return this.httpClient.get(`${this.base_url}/discover/movie?api_key=${this.api_key}&with_genres=12`);
  }

  fetchAnimationMovies():Observable<any> {
    return this.httpClient.get(`${this.base_url}/discover/movie?api_key=${this.api_key}&with_genres=16`);
  }

  fetchComedyMovies():Observable<any> {
    return this.httpClient.get(`${this.base_url}/discover/movie?api_key=${this.api_key}&with_genres=35`);
  }

  fetchDocumentaryMovies():Observable<any> {
    return this.httpClient.get(`${this.base_url}/discover/movie?api_key=${this.api_key}&with_genres=99`);
  }

  fetchSciencefictionMovies():Observable<any> {
    return this.httpClient.get(`${this.base_url}/discover/movie?api_key=${this.api_key}&with_genres=878`);
  }

  fetchThrillerMovies():Observable<any> {
    return this.httpClient.get(`${this.base_url}/discover/movie?api_key=${this.api_key}&with_genres=53`);
  }

  getMovieDetails(data:any):Observable<any> {
    return this.httpClient.get(`${this.base_url}/movie/${data}?api_key=${this.api_key}`);
  }

  getMovieVideo(data:any):Observable<any> {
    return this.httpClient.get(`${this.base_url}/movie/${data}/videos?api_key=${this.api_key}`);
  }

  getMovieCast(data:any):Observable<any> {
    return this.httpClient.get(`${this.base_url}/movie/${data}/credits?api_key=${this.api_key}`);
  }

  getSearchMovie(data:any):Observable<any> {
    return this.httpClient.get(`${this.base_url}/search/movie?api_key=${this.api_key}&query=${data.searchItem}`);
  }

  getRecommendations(data:any):Observable<any> {
    return this.httpClient.get(`${this.base_url}/movie/${data}/recommendations?api_key=${this.api_key}&language=en-US&page=1`);
  }

  // getFavourites(data:any) {
  //   return this.httpClient.get(`${this.base_url}/movie/${data}?api_key=${this.api_key}`);
  // }
}
