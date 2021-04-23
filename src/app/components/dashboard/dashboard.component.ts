import { Component, HostListener, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {BookService} from '../../Services/BookService/book.service';
import { DataService } from "../../Services/DataService/data.service";
import {CartService} from '../../Services/CartService/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, OnDestroy {
 
    Cart : any;
    CartBookNo : number = 0;
    BookID : number;
    subscription: Subscription; 
    cartRoute:string = "";
    BooksRoute:string = "";
    cartMatBatch:boolean = true;
  constructor(private BookService : BookService, private CartService:CartService,
     private router: Router, private data: DataService) {  
  }
  ngOnChanges(changes: SimpleChanges) {
   console.log(changes);
  }
  
  ngOnInit(): void {
    this.subscription = this.data.CartCurrent.subscribe(message =>
      { this.CartBookNo = message;
        this.cartMatBatch = message > 0 ? false:true}); 
    this.data.LoadCart();
  }

  onActivate($event){
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
