import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {User} from "../../models/user";

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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe( (users:any[]) =>{
      this.users = users;
    })
  }

}
