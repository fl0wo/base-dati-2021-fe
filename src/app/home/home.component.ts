import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  wantLogin:boolean = false;
  wantRegister: boolean = false;
  users: any[]= [];


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe( (users:any[]) =>{
      this.users = users;
    })
  }

}
