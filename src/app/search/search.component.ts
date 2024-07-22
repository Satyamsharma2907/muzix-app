import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchResult:any;

  constructor(private fb:FormBuilder, private  tmdbService:TmdbService) { }

  searchForm=this.fb.group({
    searchItem:['']
  })

  get searchItem(){
    return this.searchForm.get('searchItem');
  }

  set searchItem(data:any){
    this.searchForm = data;
  }

  search() {
    console.log(this.searchForm.value, 'searchform#');
    this.tmdbService.getSearchMovie(this.searchForm.value).subscribe((result)=>{
      console.log(result, 'searchmovies#');
      this.searchResult = result.results;
    })
  }

  reset(){
    this.searchItem("");
  }
}
