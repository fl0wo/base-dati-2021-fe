import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  wantLogin:boolean = false;
  wantRegister: boolean = false;
  users: any[]= [];
  me: User =  new User();

  constructor(private api: ApiService,public router: Router) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe( (users:any[]) =>{
      this.users = users;
    })
  }

  areaPersonale(){
    this.router.navigateByUrl("/me",{
      state : {
        user : this.me
      }
    });
  }

}
