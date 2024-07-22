import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.css']
})
export class Search2Component {

  constructor(private fb:FormBuilder, private  tmdbService:TmdbService) { }
  searchText:string="";
  searchForm=this.fb.group({
    searchItem:['']
  })

  get searchItem(){
    return this.searchForm.get('searchItem');
  }

  set searchItem(data:any){
    this.searchForm = data;
  }

  @Output()
  pro=new EventEmitter();


search()
{
  this.pro.emit(this.searchText)
  console.log(this.pro);
  console.log(this.searchText);
}


reset(){
  this.searchText="";
  this.pro.emit(this.searchText)
}

}
