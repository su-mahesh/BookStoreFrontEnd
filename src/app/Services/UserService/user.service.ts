import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService : HttpService) { }
  login(data: any){
    return this.httpService.post('CustomerAccount/Login', data, null);
  }
}
