import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../../services/user.service';
import {BookService} from '../../services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  libraries:any;

  addForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;


  constructor(private userService:UserService, private router: Router, private fb : FormBuilder,private bookService:BookService) { 
    this.userService.allLibrary.subscribe(x=>this.libraries=x)
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      libraryId:['',Validators.required],
      password:['',Validators.required]
    });
  }
  get f() { return this.addForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
        return;
    }

    this.loading = true;

    this.userService.addUser(this.f.name.value, this.f.age.value,"user",this.f.libraryId.value,this.f.password.value)
      .subscribe(
        data => {
          this.userService.library(this.f.libraryId.value)
          .pipe(first())
          .subscribe()
          this.bookService.getAllBook(this.f.libraryId.value)
          .pipe(first())
          .subscribe(data=>{
            window.location.reload()
            
          })
          
          this.router.navigate(['/userpage']);
        },
        error => {
          this.error = error.error.message;
          this.loading = false;
        });
  }


}
