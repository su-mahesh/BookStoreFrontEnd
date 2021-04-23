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
  
  GetBooks(){
    return this.httpService.Get('Book', this.options);
  }

}
