import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { error } from 'protractor';
@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit {
  user:any;
  reservedBook:any;
  allReserved:any;
  status:any;
  currentLibrary:any;
  constructor(private userService: UserService, private bookService: BookService) {
      this.userService.currentUser.subscribe(x=> this.user = x)
      this.userService.currentLibrary.subscribe(x=>this.currentLibrary=x)
   }

  ngOnInit() {
    this.bookService.upDateReserved(this.user.Id)
      .pipe(first())
        .subscribe(data =>{
          this.status = JSON.parse(JSON.stringify(data))
        },
        error=>{
          console.log(error)
        });
    this.bookService.reservedBook(this.user.Id,this.currentLibrary.id)
      .pipe(first())
        .subscribe(
          data => {
            // @ts-ignore
            this.reservedBook = JSON.parse(JSON.stringify(data));
          },
          error => {
            console.log(error);
          });
  }
  getAllReservedBook(){
    this.bookService.getAllReservedBook(this.currentLibrary.id)
    .pipe(first())
      .subscribe(
         data =>{
          this.allReserved = JSON.parse(JSON.stringify(data));
      },
      error => {
        console.log(error);
      });
      }
  
  

}
