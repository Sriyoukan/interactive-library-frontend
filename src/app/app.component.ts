import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from './services/user.service';
import {BookService} from './services/book.service';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'library';
  libraries : any;
  currentLibrary:any;
  currentUser: any;
  currentUserType:any;
  systemAdmin:boolean=false;
  
  
  

  constructor(private router: Router,  private  userService: UserService, private bookService: BookService ) {
    
    this.userService.currentUser.subscribe(x => this.currentUser = x);
    this.userService.currentLibrary.subscribe(x => this.currentLibrary = x);
    if(this.currentUser){
    if(this.currentUser.userType == 'systemAdmin'){
        this.systemAdmin = true
    }}
    
    
  }
  ngOnInit(){
    this.userService.getAllLibrary()
    .pipe(first())
      .subscribe(
        data => {
          // @ts-ignore
          this.libraries = JSON.parse(JSON.stringify(data)); 
        },
        error => {
          console.log(error);
        });
      
  }
  
  loginRoute(){
    this.router.navigate(['/login'])
  }
  goToAddBook(){
    this.router.navigate(['/addBook'])
  }
  goToAdmin(){
    this.router.navigate(['/admin'])
  }
  goToReserved(){
    this.router.navigate(['/reserved'])
  }
  goToNotification(){
    this.router.navigate(['/notification'])
  }
  goToSignUp(){
    this.router.navigate(['/signUp'])
  }
  goToAddLibrary(){
    this.router.navigate(['/addLibrary'])
  }
  
  
  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
