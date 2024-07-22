import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie';
import { FavouritesService } from '../services/favourites.service';
import { MoviesService } from '../services/movies.service';
import { RouteService } from '../services/route.service';
import { TmdbService } from '../services/tmdb.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit{
  favouriteMoviesResult:any = [];
  movieIdList: Array<Number> = [];
  movieIdsIterator: number = 0;
  movieDetailsList: Array<any> = [];
  showGrid: boolean = false;
  color: string = "";
  property:any = this.movieDetailsList;
  allMovies:any = this.movieDetailsList;

  constructor(private tmdbService:TmdbService, private favouriteService:FavouritesService, private userService:UserService, private routeService: RouteService, private movieService: MoviesService,
    private router:Router,private route: ActivatedRoute, private snackBar:MatSnackBar) { }
    
  ngOnInit():void {
    this.getFavouriteMovies();
  }

  datasearch(search:any){
    if(search === "" || !search){
      this.movieDetailsList=this.allMovies;
      
    console.log(this.property);
    }
    else{
      this.property=this.allMovies;
      console.log(this.property)
      
      this.property=this.property.filter((favourite:Movie)=>favourite.original_title?.startsWith(search))
      this.movieDetailsList = this.property;
      console.log(this.property);
    }
    }

  getFavouriteMovies() {
      this.favouriteService.getUserFavourites(this.userService.emailId).subscribe(
        result=>{
          this.favouriteMoviesResult = result;
          this.movieIdList = this.favouriteMoviesResult.reduce((previousValue: Array<Number>, currentValue: any) => {
            previousValue.push(currentValue.id);
            return previousValue;
          }, []);
          this.movieIdsIterator = this.movieIdList.length;
          this.movieDetailsList = [];
          this.movieIdList.forEach((id: Number) => {
            this.tmdbService.getMovieDetails(id).subscribe((response: any) => {
              this.movieDetailsList.push(response);
              --this.movieIdsIterator;
              if (this.movieIdsIterator === 0) {
                this.displayFavoritesGrid();
              }
            });
            this.allMovies = this.movieDetailsList;
          });
          console.log(result);
        }
      );
    }

    openSnackBar(){
      this.snackBar.open('Movie deleted from Favourites', 'success', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-warn']   
          }) 
    }

    deleteFavourite(mid:number) {
      this.movieService.deleteUserFavourite(this.userService.emailId, mid).subscribe(
        result=>{
          console.log(result);
          this.openSnackBar();
          let index = this.movieIdList.indexOf(mid);
          this.movieIdList.splice(index, 1);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(['./'],{relativeTo:this.route});
        }
      );
    }

  private displayFavoritesGrid(): void {
    this.showGrid = true;
  }
}
