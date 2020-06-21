import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  user:any;
  notification:any;
  constructor(private userService:UserService) { 
    this.userService.currentUser.subscribe(x=> this.user = x)

  }

  ngOnInit() {
    if(!this.user.isAdmin){
      this.userService.notifications(this.user.Id)
      .pipe(first())
        .subscribe(
          data => {
            // @ts-ignore
            this.notification = JSON.parse(JSON.stringify(data));
          },
          error => {
            console.log(error);
          });
    }else{
    this.userService.adminNotification()
    .pipe(first())
        .subscribe(
          data => {
            // @ts-ignore
            this.notification = JSON.parse(JSON.stringify(data));
          },
          error => {
            console.log(error);
          });
    }
      
  }

}
