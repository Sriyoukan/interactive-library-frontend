import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {BookService} from '../../services/book.service';
import {UserService} from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  file:File ;
  addForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;
    currentLibrary:any;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private modalservice: NgbModal, private router: Router,private userService:UserService) {
        this.userService.currentLibrary.subscribe(x=>this.currentLibrary=x)
   }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      file:'',
      author: ['', Validators.required],
      bookId:['',Validators.required],
      numberOfCopiesAvailable:['',Validators.required],
      totalCopies:['',Validators.required]
    });
  }
  get f() { return this.addForm.controls; }

  onFileChange(event) {
    if(event.target.files.length>0){
      this.file = event.target.files[0]
    }
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
        return;
    }
    let formdata:FormData = new FormData()
    formdata.append('file',this.file,this.file.name)
    
    this.bookService.uploadFile(formdata)
    .subscribe(
      data => {
    },
      error => {
        this.error = error.error.message;
        this.loading = false;
      });

    

    this.bookService.addBook(this.f.title.value, this.f.author.value,this.currentLibrary.id,this.f.bookId.value,this.f.numberOfCopiesAvailable.value,this.f.totalCopies.value,this.file.name)
      .subscribe(
        data => {
        
          this.router.navigate(['/userpage']);
        
        },
        error => {
          this.error = error.error.message;
          this.loading = false;
        });
  }

}
