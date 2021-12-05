import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faAddressBook, faKey} from "@fortawesome/free-solid-svg-icons";
import {ApiService} from "../api.service";
import {Course} from "../../models/Course";
import {MessageReponse} from "../../models/MessageResponse";
import {MessageResponseDialogComponent} from "../shared-components/message-response-dialog/message-response-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-lesson-reservation',
  templateUrl: './lesson-reservation.component.html',
  styleUrls: ['./lesson-reservation.component.css']
})
export class LessonReservationComponent implements OnInit {

  @Output() wantScreen = new EventEmitter<boolean>();

  icons = {
    basic : faAddressBook,
    pwd : faKey
  }

  body : any = {
    date : "",
    time : "",
    max_participants : 0,
    course: "" //ID CORSO
  }

  courses : Course[] = [];
  selectedCourse!: Course;
  constructor(private api:ApiService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.api.getCourses().subscribe((courseArray) => {
      this.courses=courseArray;
    });
  }

  saveLesson(){
    if(this.body.time != "" && this.body.date != "" && this.body.course != "" && this.body.max_participants > 0){
      this.api.addLesson(this.body).subscribe(resp=>{
        if(resp.status==200) {
          this.addLessonSuccess(resp.data);
        } else {
          this.addLessonFailed(resp.data);
        }
      })
    }
  }

  private addLessonSuccess(msg: MessageReponse) {
    this.dialog.open(MessageResponseDialogComponent, {
      data: {
        title: "Lesson Added!",
        message: msg.message
      }
    });
  }

  private addLessonFailed(msg: MessageReponse) {
    this.dialog.open(MessageResponseDialogComponent, {
      data: {
        title: "Login failed",
        message: msg.message
      }
    });
  }

  closeScreen() {
    this.wantScreen.emit(false);
  }

  onSelectCourse(course: Course) {
      this.selectedCourse = course;
      this.body.course = this.selectedCourse;
  }
}
