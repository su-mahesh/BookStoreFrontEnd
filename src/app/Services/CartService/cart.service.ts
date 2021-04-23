import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  headers = new HttpHeaders()
  .set('Authorization', 'Bearer '+localStorage.getItem('BookStore')); 
   options = { headers: this.headers };

  constructor(private httpService : HttpService) { }

  UpdateBookInCart(bookID: any, quntity: any) {
    return this.httpService.put('Cart/'+bookID+'/'+quntity,null, this.options);
  }
  GetCart(){
    return this.httpService.Get('Cart', this.options);
  }
  AddBookToCart(ID:number){
    return this.httpService.post('Cart/'+ID, null, this.options);
  }
}
