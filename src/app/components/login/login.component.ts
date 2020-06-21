import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {BookService} from '../../services/book.service';
import * as bootstrap from "bootstrap"; 
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  SystemAdmin = false;
  LibraryAdmin = false;
  user = false;
  libraries:any[];


  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private auth: UserService, private modalservice: NgbModal, private router: Router,private bookService:BookService) {
  if(this.auth.currentUserValue){
    if (this.auth.currentUserValue.userType!='systemAdmin') {
      this.router.navigate(['/userpage'])
    }else{ 
        this.router.navigate(['/systemAdmin'])
      
    }
  }
    this.auth.allLibrary.subscribe(x=>this.libraries=x)
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userType:['',Validators.required],
      libraryId:['',Validators.required],
      Id: ['', Validators.required],
      password: ['', Validators.required]
    });


  }
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    this.auth.login(this.f.userType.value,this.f.libraryId.value,this.f.Id.value, this.f.password.value)
    .pipe(first())
      .subscribe(
        data => {
          this.auth.library(this.f.libraryId.value)
          .pipe(first())
          .subscribe()
          if(data.userType=='systemAdmin'){
            window.location.reload();
            this.SystemAdmin=true;
            this.router.navigate(['/systemAdmin'])
          }else{
          this.bookService.getAllBook(this.f.libraryId.value)
          .pipe(first())
          .subscribe(data=>{
            window.location.reload();
            this.router.navigate(['/userpage']);
          })}
          
        },
        error => {
          this.error = error.error.message;
          this.loading = false;
        });
  }
  navigateToHome(){
    this.router.navigate(['/'])
  }



}
