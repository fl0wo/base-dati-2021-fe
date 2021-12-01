import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css']
})
export class PrivateAreaComponent implements OnInit {

  me:User = new User();

  constructor(public router:Router,private api:ApiService) {
    let currentNavigation = this.router.getCurrentNavigation();
    if(currentNavigation!=null) {
      let jwt = currentNavigation?.extras.state!['user'].token;
      if (jwt != null) {
        api.getMe(jwt).subscribe(user=>{
          this.me.surname = user.surname;
          this.me.name = user.name;
          this.me.role = user.role;
          this.me.email = user.email;
        });
      }
    } else {
      console.log("is null in constructor")
    }
  }

  ngOnInit(): void {
  }

}
