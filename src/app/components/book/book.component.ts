import { Component, OnInit } from '@angular/core';
import { BookService} from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { element } from 'protractor';
import { error } from 'util';
import { from } from 'rxjs';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book:any;
  currentUser:any;
  currentUserType:any;
  currentLibrary:any;
  status:any;
  search:"";
  searchResult:any;
  reserved:any;

  constructor(private bookService: BookService, private userService: UserService) { 
    this.bookService.book.subscribe(x => this.book = x);
    this.userService.currentUser.subscribe(x=> this.currentUser = x);
    this.userService.currentLibrary.subscribe(x=>this.currentLibrary=x);


  }
  ngOnInit() {
    this.bookService.getAllBook(this.currentLibrary.id)
    .pipe(first())
      .subscribe(
        data => {
          // @ts-ignore
          this.book = JSON.parse(JSON.stringify(data)); 
        },
        error => {
          console.log(error);
        });
  }
  reserve(title,borrower,id){
    
    this.bookService.reserveBook(title,borrower,id)
      .pipe(first())
        .subscribe(data =>{
          this.reserved = JSON.parse(JSON.stringify(data))
          if(this.reserved){
            this.status = "you alredy have this book"
          }else{
            this.status = "successfully resereved"
            this.ngOnInit()
          }
          
        },
        error =>{
          console.log(error)
        })
        
      
  }
  acceptBook(title,borrower){
    this.bookService.adminAcceptBook(title,borrower)
    .pipe(first())
        .subscribe(data =>{
            this.status = JSON.parse(JSON.stringify(data));
        },
        error =>{
          console.log(error)
        })
        this.ngOnInit()

  }
  
  searchBook(search){
    this.bookService.searchBook(search)
    .pipe(first())
    .subscribe(data=>{
      this.book = JSON.parse(JSON.stringify(data))
    })
  }

}
