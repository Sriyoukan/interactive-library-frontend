import { Component, OnInit } from '@angular/core';
import { BookService} from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { error } from 'protractor';
import { from } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [BookService]

})
export class AdminComponent implements OnInit {
  book:any;
  currentUser:any;
  currentUserType:any;
  allReserved:any;
  status:any;
  search:any;
  searchResult:any;
  constructor( private bookService: BookService , private userService:UserService,private router:Router) {
    this.bookService.book.subscribe(x=> this.bookService.book = x)
    this.userService.currentUser.subscribe(x=> this.currentUser =x)
   }

  ngOnInit() {
    this.bookService.getAllReservedBook(this.currentUser.libraryId)
      .pipe(first())
        .subscribe(
          data => {
            // @ts-ignore
            this.allReserved = JSON.parse(JSON.stringify(data));
          },
          error => {
            console.log(error);
          });
  }
  
  returnBook(title,borrower){
    this.bookService.returnBook(title,borrower)
      .pipe(first())
        .subscribe(data =>{
          this.status = JSON.parse(JSON.stringify(data))
        },
        error =>{
          console.log(error)
        }
        )
        window.location.reload();


  }
  acceptBook(title,borrower){
    this.bookService.adminAcceptBook(title,borrower)
      .pipe(first())
        .subscribe(data =>{
          this.status = JSON.parse(JSON.stringify(data))
        },
        error =>{
          console.log(error)
        }
        )
        window.location.reload();


  }
  searchReserved(search){
    this.bookService.searchReserved(search)
    .pipe(first())
    .subscribe(data=>{
      this.allReserved = JSON.parse(JSON.stringify(data))
    })
  }
  
  

}
