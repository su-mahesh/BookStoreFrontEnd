import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment'
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/DataService/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  ShopEmail = environment.ShopEmail;
  ShopContact = environment.ShopContact;
  ShopAddress = environment.ShopAddress;
  OrderID : any;
  subscription: Subscription;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.OrderIDCurrent.subscribe(message => this.OrderID = message);
  }

}
