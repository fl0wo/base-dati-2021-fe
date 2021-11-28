import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";
import { faAddressBook, faKey, faSubscript, faPen } from '@fortawesome/free-solid-svg-icons';
import {ApiService} from "../api.service";
import {MessageResponseDialogComponent} from "../shared-components/message-response-dialog/message-response-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @Input() user!: User;
  @Output() userChange:EventEmitter<User> = new EventEmitter<User>();

  @Input() wantScreen:boolean=false;
  @Output() wantScreenChange:EventEmitter<boolean>=new EventEmitter<boolean>();

  icons = {
    email : faAddressBook,
    pwd : faKey,
    name : faSubscript,
    surname : faPen
  }

  constructor(private api:ApiService,public dialog: MatDialog) { }

  registerUser() {
    this.api.registerUser(this.user).subscribe((msg)=>{

      this.dialog.open(MessageResponseDialogComponent, {
        data : {
          title : "Registration completed",
          message : msg.message
        }
      });

      this.wantScreen=false;
      this.wantScreenChange.next(this.wantScreen);
    });
  }
}
