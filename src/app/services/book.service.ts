import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookSubject: BehaviorSubject<any>;
  public currentUserSubject: BehaviorSubject<any>
  public book: Observable<any>;
  public currentUserType:Observable<any>
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {
    this.bookSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('book')));
    this.book = this.bookSubject.asObservable();
    

  }

  public get bookValue() {
    return this.bookSubject.value;
  }
  uploadFile(file:FormData){
    
    return this.http.post<any>(`${this.apiUrl}/uploadfile`,file,{reportProgress: true,  observe: 'events' })
    .pipe(map(uploaded => {
      return uploaded
    }))

      
  }

  getAllBook(id) {
    return this.http.post<any>(`${this.apiUrl}/allBook`,{id})
      .pipe(map(bookList => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        
        this.bookSubject.next(bookList);
        return bookList;
        
      }));

  }
  getAllReservedBook(id){
    return this.http.post<any>(`${this.apiUrl}/allReserved`,{id})
      .pipe(map(allReserved =>{

        return allReserved
      }))
  }

  reserveBook(title,borrower,id){
    return this.http.post<any>(`${this.apiUrl}/userReserveBook`,{title,borrower,id})
      .pipe(map(reserveBook =>{
        localStorage.setItem('reserveBook',JSON.stringify(reserveBook)); 
        return reserveBook

      }))
  }
  adminAcceptBook(title,borrower){
    return this.http.post<any>(`${this.apiUrl}/adminAcceptBook`,{title,borrower})
      .pipe(map(accepted=>{
        localStorage.setItem('accepted',JSON.stringify(accepted));
      }))
  }

 reservedBook(borrower,libraryId){
    return this.http.post<any>(`${this.apiUrl}/reservedBook`,{borrower,libraryId})
      .pipe(map(reservedBook=>{
        return reservedBook;
      }))
  }
  addBook(title,author,libraryId,bookId,numberOfCopiesAvailable,totalCopies){
    return this.http.post<any>(`${this.apiUrl}/book`,{title,author,libraryId,bookId,numberOfCopiesAvailable,totalCopies})
      .pipe(map(addedBook=>{
        
        return addedBook;
      }))
  }
  
  returnBook(title,borrower){
    return this.http.post<any>(`${this.apiUrl}/returnBook`,{title,borrower})
      .pipe(map(status =>{
        localStorage.setItem('status',JSON.stringify(status));
        return status;
      }))
  }
  upDateReserved(borrower){
    return this.http.post<any>(`${this.apiUrl}/reservedUpdate`,{borrower})
      .pipe(map(status=>{
        return status
      }))
  }
  searchBook(search){
    return this.http.post<any>(`${this.apiUrl}/search`,{search})
    .pipe(map(result=>{
      return result
    }))
  }
  searchReserved(search){
    return this.http.post<any>(`${this.apiUrl}/searchReserved`,{search})
    .pipe(map(result=>{
      return result
    }))
  }
  
}
  

  

  
