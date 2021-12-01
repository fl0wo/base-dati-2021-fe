import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Slot} from "../../models/Slot";

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {
    date:Date,
    slots:Slot[]
  }) { }

  ngOnInit(): void {
  }

}
