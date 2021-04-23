import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpService : HttpService) { }
  headers = new HttpHeaders()
  .set('Authorization', 'Bearer '+localStorage.getItem('BookStore')); 
    options = { headers: this.headers };

  AddAddress(address:any){
    return this.httpService.post('CustomerAddress',address,this.options);
  }
}
