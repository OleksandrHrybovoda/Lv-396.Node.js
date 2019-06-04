import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Output() public onDateChange = new EventEmitter<Date>();
  public datepickerModel: Date;
  constructor() {
  }

  ngOnInit() {
  }

  onValueChange(value: Date): void {
    this.onDateChange.emit(value);
  }

}
