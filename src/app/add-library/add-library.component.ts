import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {BookService} from '../services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-library',
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.css']
})
export class AddLibraryComponent implements OnInit {
  libraryForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;

  constructor(private formBuilder: FormBuilder, private auth: UserService, private modalservice: NgbModal, private router: Router,private bookService:BookService) {

   }

  ngOnInit() {
    this.libraryForm = this.formBuilder.group({
      name:['',Validators.required],
      place:['',Validators.required],
      id: ['', Validators.required],
      userName: ['', Validators.required],
      userAge: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.libraryForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.libraryForm.invalid) {
        return;
    }

    this.loading = true;

    this.auth.addLibrary(this.f.name.value,this.f.place.value,this.f.id.value)
    .pipe(first())
      .subscribe(
        data => {
          this.auth.addLibraryAdmin(this.f.userName.value,this.f.userAge.value,this.f.id.value,"libraryAdmin",this.f.password.value)
          .pipe(first())
            .subscribe(data=>{
              window.location.reload();
              this.router.navigate(['/systemAdmin'])
            })
        },
        error => {
          this.error = error.error.message;
          this.loading = false;
        });
  }
  navigateToSystemAdmin(){
    this.router.navigate(['/systemAdmin'])
  }

}
