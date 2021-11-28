import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  @Input() icon = faAddressBook;
  @Input() field= {};
  @Output() fieldChange = new EventEmitter();

  @Input() inputType:string = "";
  @Input() inputPlaceHolder = "";

  @Input() label = "";

  constructor() { }

  ngOnInit(): void {
  }

  updateField() {
    this.fieldChange.next(this.field);
  }
}
