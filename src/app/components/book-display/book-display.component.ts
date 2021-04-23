import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/DataService/data.service';
import {BookService} from '../../Services/BookService/book.service';
import {CartService} from '../../Services/CartService/cart.service';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  // @Input() Books: Array<{ BookID: number, BookTitle:string, BookAuthor:string, BookImage:string, BookDescription:string,
//  @Input() 
  Books: any;
  BooksArray : Array<any>;
  BookQuntity : number = 10;
  BookDescription : string;
  BookDesc : boolean = false;
  top: number;
  left:number;
  @ViewChild('bookdesc') bookDetail: ElementRef;
  @Output() messageEvent = new EventEmitter<string>();
  BagAddTxt : string = "ADD TO BAG";

  BagAddedTxt : string = "ADDED TO BAG";
  AddeToBagBookN : number = 0;
  message:string;
  subscription: Subscription;
  pageOfItems: Array<any>;
  BookQuanity: number=0;
  
  constructor(private CartService : CartService, private BookService : BookService, 
    public snackBar: MatSnackBar, private data: DataService) {   }
  ngOnInit(): void { 
    this.subscription = this.data.booksArrayCurrent.subscribe(message => this.Books = message);
    this.LoadBooks();
   }
  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
  LoadBooks(){
    this.BookService.GetBooks().subscribe(
      (response: any) => {    
      this.BooksArray = response['books'];
      this.BookQuanity= response['books'].length
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    this.UpdateBooks(this.pageOfItems);
  } 
  
  UpdateBooks(books) {
    this.data.UpdateBooks(books);
  }
  position(desc : string, $event: any){
    this.BookDescription = desc;
    this.BookDesc = true;
    var topLimit = 55;
    var targetTop = $event.target.getBoundingClientRect().top;
    var targetOffesetTop = $event.target.offsetTop;
    this.left =  $event.target.offsetLeft + $event.target.clientWidth;
    this.top = targetTop < topLimit ? targetOffesetTop + topLimit - targetTop : targetOffesetTop;
  }
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }
  sendMessage() {
    this.messageEvent.emit()
  }
  CloseBDesc(){
    this.BookDesc = false;
  }
  ngAfterViewInit(): void {
  }
  AddToCart(ID : number,i:number){
    this.openSnackBar('Adding book to Bag',0);
    this.CartService.AddBookToCart(ID).subscribe(
      (response: any) => {
        this.sendMessage();
        this.Books[i]['inCart']=true;  
        this.data.LoadCart();
        this.openSnackBar('Book added to Bag',2000);
      },
      error => {
        this.openSnackBar('Book adding to Bag failed',2000);
      });
     
  }
}
