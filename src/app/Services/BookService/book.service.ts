import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  headers = new HttpHeaders()
  .set('Authorization', 'Bearer '+localStorage.getItem('BookStore')); 
  options = { headers: this.headers };

  constructor(private httpService : HttpService) { }
  GetSearchedBooks(param){
    return this.httpService.Get('Book/'+param, this.options);
  }
  GetBooks(){
    return this.httpService.Get('Book', this.options);
  }
  GetPriceSortBooks(sort:boolean){
    return this.httpService.Get('Book/sortbyprice/'+sort, this.options);
  }
}
