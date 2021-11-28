import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css']
})
export class PrivateAreaComponent implements OnInit {

  me!:User;

  constructor(public router:Router) {
    let currentNavigation = this.router.getCurrentNavigation();
    if(currentNavigation!=null) {
      this.me = currentNavigation?.extras.state!['user'];
    } else {
      console.log("is null in constructor")
    }
  }

  ngOnInit(): void {
  }

}
