import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";
import { faAddressBook, faKey, faSubscript, faPen } from '@fortawesome/free-solid-svg-icons';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @Input() user!: User;
  @Output() userChange:EventEmitter<User> = new EventEmitter<User>();

  icons = {
    email : faAddressBook,
    pwd : faKey,
    name : faSubscript,
    surname : faPen
  }

  constructor(private api:ApiService) { }


  registerUser() {
    this.api.registerUser(this.user).subscribe((msg)=>{
      alert(msg.message);
    });
  }
}
