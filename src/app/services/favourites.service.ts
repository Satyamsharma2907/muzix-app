import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private httpClient:HttpClient) { }

  base_url:string="http://localhost:65001/api/favouriteservice";

  getUserFavourites(email:string) {
    return this.httpClient.get(this.base_url+"/favourite/"+email);
  }

  // deleteUserFavourite(email:string, mid:number) {
  //   return this.httpClient.put(this.base_url+"/favourites/"+email+"/"+mid, mid);
  // }
}
