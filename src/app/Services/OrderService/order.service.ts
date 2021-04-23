import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  headers = new HttpHeaders()
  .set('Authorization', 'Bearer '+localStorage.getItem('BookStore')); 
   options = { headers: this.headers };

  constructor(private httpService : HttpService) { }

  PlaceOrder(addressID:any){
    return this.httpService.post('Order/'+addressID,addressID,this.options);
  }
}
