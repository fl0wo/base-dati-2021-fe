import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Slot} from "../../models/Slot";
import {TimelineModel} from "ngx-timeline-acracode";

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {
  list: any = [
    {
      datetime: new Date('2020-03-29 23:59:59'),
      header: 'Sample of header',
      body: [
        {
          tag: 'h1',
          content: "Lorem ipsum"
        },
        {
          tag: 'p',
          content: 'Lorem ipsum dolor sit amet, nisl lorem, wisi egestas orci tempus class massa.'
        }],
      footer: 'Sample of footer. See <a href=\"https://github.com/Albejr/ngx-timeline\" target=\"_blank\">more details</a>'
    }
  ];

  events: any;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {
    date:Date,
    slots:Slot[]
  }) { }

  ngOnInit() {
    this.events = new Array<TimelineModel>();

    this.data.slots = this.data.slots.sort((a,b)=>{
      return new Date('1970-01-01T' + a.time_from + 'Z').getTime()
        -
        new Date('1970-01-01T' + b.time_from + 'Z').getTime()
    })

    this.data.slots.forEach(slot=>{
      this.events.push({
        'date': this.data.date,
        'header': slot.title + " " + slot.time_from + " - "  + slot.time_to,
        'body': slot.description + "\nCurrent capacity: " + slot.current_capacity + "/"+ slot.max_capacity,
        'iconheadercolor':'rgb(255, 25, 38)'
      });
    })
   }

}
