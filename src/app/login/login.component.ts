import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/User";
import {faAddressBook, faKey, faPen, faSubscript} from "@fortawesome/free-solid-svg-icons";
import {ApiService} from "../api.service";
import {MatDialog} from "@angular/material/dialog";
import {MessageResponseDialogComponent} from "../shared-components/message-response-dialog/message-response-dialog.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() user!: User;
  @Output() userChange:EventEmitter<User> = new EventEmitter<User>();

  @Input() wantScreen:boolean=false;
  @Output() wantScreenChange:EventEmitter<boolean>=new EventEmitter<boolean>();

  icons = {
    email : faAddressBook,
    pwd : faKey
  }

  constructor(private api:ApiService,public dialog: MatDialog) { }

  loginUser() {
    this.api.loginUser(this.user).subscribe((msg)=>{
      this.user.token = msg.message;
      this.dialog.open(MessageResponseDialogComponent, {
        data : {
          title : "Registration completed",
          message : msg.message
        }
      });

      this.closeScreen()
    });
  }

  closeScreen() {
    this.wantScreen=false;
    this.wantScreenChange.next(this.wantScreen);
  }

  ngOnInit(): void {
  }

}
