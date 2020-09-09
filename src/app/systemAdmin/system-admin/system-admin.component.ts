import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.css']
})
export class SystemAdminComponent implements OnInit {
  Libraries:any

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllLibrary()
    .subscribe(data=>{
      this.Libraries=data
    })
    

  }

  deleteLibrary(id){
    this.userService.deleteLibrary(id)
    .subscribe(data=>{

    })
    
    this.userService.deleteUser(id)
    .subscribe(data=>{
      
    })
   this.userService.deleteBook(id)
   .subscribe(data=>{
      
  })
    this.userService.deleteRecieved(id)
    .subscribe(data=>{
      
    })
    window.location.reload();
  }

}
