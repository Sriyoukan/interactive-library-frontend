import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public currentLibrarySubject: BehaviorSubject<any>;
  public currentLibrary: Observable<any>;
  public allLibrarySubject: BehaviorSubject<any>;
  public allLibrary: Observable<any>;
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentLibrarySubject=new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentLibrary')));
    this.currentLibrary = this.currentLibrarySubject.asObservable();
    this.allLibrarySubject=new BehaviorSubject<any>(JSON.parse(localStorage.getItem('allLibrary')));
    this.allLibrary = this.allLibrarySubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  getAllLibrary(){
    return this.http.get<any>(`${this.apiUrl}/allLibrary`)
    .pipe(map(library => {
      localStorage.setItem('allLibrary', JSON.stringify(library));
      return library;
    }))

  }

  library(id){
    return this.http.post<any>(`${this.apiUrl}/myLibrary`,{id})
      .pipe(map(library => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentLibrary', JSON.stringify(library));
        this.currentLibrarySubject.next(library);

      return library;

    }));
  }

  login(userType,libraryId,Id, password) {
    return this.http.post<any>(`${this.apiUrl}/user/login`, {userType,libraryId,Id, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser',JSON.stringify(user))
        this.currentUserSubject.next(user);
        
        
        return user;
        
      }));

  }
  notifications(borrower){
    return this.http.post<any>(`${this.apiUrl}/notification`,{borrower})
    .pipe(map(notification => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('notification', JSON.stringify(notification));
      return notification;

  }))
}
  adminNotification(){
    return this.http.get<any>(`${this.apiUrl}/adminNotification`)
      .pipe(map(notifications => {
        localStorage.setItem('adminNotifications',JSON.stringify(notifications))
        return notifications;
      }))
  }
  addUser(name,age,userType,libraryId,password){
    return this.http.post<any>(`${this.apiUrl}/user`,{name,age,userType,libraryId,password})
      .pipe(map(user=>{
        localStorage.setItem('currentUser',JSON.stringify(user))
        this.currentUserSubject.next(user);
        return user
      }))

  }
  addLibrary(name,place,id){
    return this.http.post<any>(`${this.apiUrl}/library`,{name,place,id})
      .pipe(map(library=>{
        return library
      }))
  }
  addLibraryAdmin(name,age,libraryId,userType,password){
    return this.http.post<any>(`${this.apiUrl}/user`,{name,age,libraryId,userType,password})
      .pipe(map(user=>{
        return user
      }))

  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('reservedBook');
    localStorage.removeItem('notification');
    localStorage.removeItem('reserveBook')
    this.currentUserSubject.next(null);
  }

  
}
