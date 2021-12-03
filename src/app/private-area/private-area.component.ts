import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {Subscription} from "../../models/Subscription";

@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css']
})
export class PrivateAreaComponent implements OnInit {

  me:User = new User();
  subscriptions:Subscription[] = [];

  constructor(public router:Router,public api:ApiService) {}

  ngOnInit(): void {
      let jwt = this.api.token;
      if (jwt != null) {
        this.api.getMe(jwt).subscribe(user=>{
          this.me.surname = user.surname;
          this.me.name = user.name;
          this.me.role = user.role;
          this.me.email = user.email;
        });
        this.api.getMySubscription(jwt).subscribe(subs=>{
          this.subscriptions=subs;
        });
    }
  }
}
