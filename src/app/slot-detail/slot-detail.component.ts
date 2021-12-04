import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Slot} from "../../models/Slot";

@Component({
  selector: 'app-slot-detail',
  templateUrl: './slot-detail.component.html',
  styleUrls: ['./slot-detail.component.css']
})
export class SlotDetailComponent implements OnInit {

  @Output() wantScreen = new EventEmitter<boolean>();

  body : any = {
    date : "",
    time_from : "",
    time_to : "",
    max_capacity : "",
    title : "",
    description : "",
}

  constructor() { }

  ngOnInit(): void {
  }

  closeScreen() {
    this.wantScreen.emit(false);
  }

  saveSlot() {

  }
}
