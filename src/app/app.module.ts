import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing.module';

import {LoggedInGuard} from './logged-in.guard';
import { BookService } from './services/book.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { AdminComponent } from './components/admin/admin.component';
import { ReservedComponent } from './components/reserved/reserved.component';
import { BookComponent } from './components/book/book.component';
import { from } from 'rxjs';
import { AddBookComponent } from './components/add-book/add-book.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LibraryComponent } from './library/library.component';
import { SystemAdminComponent } from './systemAdmin/system-admin/system-admin.component';
import { AddLibraryComponent } from './add-library/add-library.component';
const routes: Routes = [
  {path:'login' , component: LoginComponent },
  {path:'reserved', component: ReservedComponent},
  {path:'userpage',component:BookComponent},
  {path:'admin',component:AdminComponent,canActivate:[LoggedInGuard]},
  {path:'addBook',component:AddBookComponent,canActivate:[LoggedInGuard]},
  {path:'notification',component:NotificationsComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'systemAdmin',component:SystemAdminComponent,canActivate:[LoggedInGuard]},
  {path:'addLibrary',component:AddLibraryComponent},

  {path:'',component:LibraryComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    BookComponent,
    ReservedComponent,
    AddBookComponent,
    NotificationsComponent,
    SignUpComponent,
    LibraryComponent,
    SystemAdminComponent,
    AddLibraryComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BookService,LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
