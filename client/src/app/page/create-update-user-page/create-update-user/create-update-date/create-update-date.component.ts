import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { CreateUpdateUserService } from '../../../common/create-update-user.service';

@Component({
  selector: 'app-create-update-date',
  templateUrl: './create-update-date.component.html',
  styleUrls: ['./create-update-date.component.scss']
})
export class CreateUpdateDateComponent implements OnInit {
  public addDatesForm: FormGroup;
  dates: string[];

  constructor(private fb: FormBuilder,
              private createUpdateUser: CreateUpdateUserService) {
  }

  ngOnInit(): void {
    this.addDatesForm = this.fb.group({
      datesCount: this.fb.array([
        {
          topic: 'Upcoming review',
          date: [''],
        },
      ])
    });
  }

  initDates(): any {
    return this.fb.group({
      topic: [''],
      date: [],
    });
  }

  addDate(): void {
    const control = this.addDatesForm.controls.datesCount as FormArray;
    control.push(this.initDates());
  }

  removeDate(i: number): void {
    const control = this.addDatesForm.controls.datesCount as FormArray;
    control.removeAt(i);
    this.updateDates();
  }

  checkFirstElement(i: number): boolean {
    return i === 0;
  }

  updateDates(): void {
    this.createUpdateUser.updateUserData('finalDates', this.addDatesForm.controls.datesCount.value);
  }

  updateDatePicker($event: any, i: number): void {
    this.addDatesForm.controls.datesCount.value[i].date = $event;
    this.updateDates();
  }

  updateTopic($event: any, i: number): void {
    this.addDatesForm.controls.datesCount.value[i].topic = $event.target.value;
    this.updateDates();
  }

  leftBorderStylesForDate(date: string, i: number): string {
    if (date === 'topic') {
      return this.addDatesForm.controls.datesCount.value[i].topic ? 'border-green' : 'border-red';
      }

    return this.addDatesForm.controls.datesCount.value[i].date ? 'border-green' : 'border-red';
  }
}
