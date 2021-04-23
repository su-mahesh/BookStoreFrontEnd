import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CartService} from '../../Services/CartService/cart.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  private booksArray = new BehaviorSubject(null);
  booksArrayCurrent = this.booksArray.asObservable();

  private CartBookCount = new BehaviorSubject(null);
  CartCurrent = this.CartBookCount.asObservable();

  private OrderID = new BehaviorSubject(null);
  OrderIDCurrent = this.OrderID.asObservable();

  constructor(private CartService : CartService) {
    
   }
  ngOnInit(): void {
    this.LoadCart();
  }
  LoadCart(){
    this.CartService.GetCart().subscribe(
      (response: any) => {
      this.CartBookCount.next(response['cart'].length);
    });
  }

  UpdateBooks(message: string) {
    this.booksArray.next(message);
  }

  SetOrderID(OrderID){
    this.OrderID.next(OrderID);
  }

}
