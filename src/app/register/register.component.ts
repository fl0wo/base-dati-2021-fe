import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";
import { faAddressBook, faKey, faSubscript, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() user!: User;
  @Output() userChange:EventEmitter<User> = new EventEmitter<User>();

  icons = {
    email : faAddressBook,
    pwd : faKey,
    name : faSubscript,
    surname : faPen
  }

  constructor() { }

  ngOnInit(): void {
  }

  registerUser() {
  }
}
