import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {BookService} from '../../Services/BookService/book.service';
import {AddressService} from '../../Services/AddressService/address.service';
import {CartService} from '../../Services/CartService/cart.service';
import { DataService } from "../../Services/DataService/data.service";
import {OrderService} from '../../Services/OrderService/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  BooksInCart : number = 0;
  CartBooks : [];
  addressForm: FormGroup;
  custd : boolean = false;
  custaedit : boolean = false;
  ordersum : boolean = false;
  editVisibiliy : boolean = false;
  CartLength: number = 0;
  EmptyCart: boolean=true;

  private Name: FormControl = new FormControl({ value: '', disabled:this.custaedit});

  constructor(private data: DataService, private CartService : CartService,
    private formBuilder:FormBuilder, private router: Router,
    private AddressService: AddressService,
    private OrderService: OrderService) {
    this.addressForm = this.formBuilder.group({
      Name:  new FormControl('',Validators.required),
      PhoneNumber:  new FormControl('',Validators.required),
      Pincode:  new FormControl('',[Validators.required]),
      Locality:  new FormControl('',Validators.required),
      Address:  new FormControl('',Validators.required),
      City:  new FormControl('',Validators.required),
      Landmark:  new FormControl('',Validators.required),
      AddressType: new FormControl('',Validators.required)
    })
   }
   FillAddress(el: HTMLElement){
     this.editVisibiliy = !this.editVisibiliy;
     this.custaedit = true;
     this.scroll(el);
   }
ToggleCEdit(){
    this.custaedit = false;
    this.editVisibiliy = false;
   }
placOrder(el: HTMLElement) { 
    this.CartBooks.forEach( (book) => {
      this.CartService.UpdateBookInCart(book['bookID'], book['count']).subscribe(
        (response: any) => {
          this.LoadCart();
      }); 
    }); 
    this.CartBooks.forEach( (book) => {
      if(book['count']>0){
        this.EmptyCart = false;
      }
    }); 
    if(!this.EmptyCart)
    {
      this.custd=!this.custd;
      this.scroll(el);
    } 
  }
CheckOut(){
  if(this.addressForm.valid){
    let Addrress={
      Name: this.addressForm.get('Name')?.value,
      Pincode: this.addressForm.get('Pincode')?.value,  
      PhoneNumber: this.addressForm.get('PhoneNumber')?.value,  
      Locality: this.addressForm.get('Locality')?.value,  
      Address: this.addressForm.get('Address')?.value,  
      City: this.addressForm.get('City')?.value,  
      Landmark: this.addressForm.get('Landmark')?.value,  
      AddressType: this.addressForm.get('AddressType')?.value,
    }
    this.AddressService.AddAddress(Addrress).subscribe(
      (response: any) => {
        this.CompleteOrder(response['address']['addressID']);
    });
  }
}

CompleteOrder(AddressID){
  this.OrderService.PlaceOrder(AddressID).subscribe(
    (response: any) => {
      this.data.SetOrderID(response['order']['orderID']);
      this.router.navigate(['/order']);
      this.data.LoadCart();
  });;
}

scroll(el: HTMLElement){
  
  setTimeout(()=>{ el.scrollIntoView({behavior: 'smooth'})}, 0);
}
  ToggleCustomerDetail(){
    this.custd = !this.custd;
  }
  ngOnInit(): void {
    this.LoadCart();
  }
  LoadCart(){
    this.CartService.GetCart().subscribe(
      (response: any) => {
        this.CartBooks = response['cart'];
        this.CartLength = this.CartBooks.length;
        this.data.LoadCart();
    });
  }
}
