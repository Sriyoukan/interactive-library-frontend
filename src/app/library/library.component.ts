import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  libraries: any;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
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
  goToLibrary(libraryId){
    this.userService.library(libraryId)
    .pipe(first())
    .subscribe(data=>{
      this.router.navigate(['/userpage'])
    })
  }

}
