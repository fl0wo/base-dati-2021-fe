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
      this.api.getMe().subscribe(user=>{
        this.me = user;
      });
      this.api.getMySubscription().subscribe(subs=>{
        this.subscriptions=subs;
      });
  }
}
