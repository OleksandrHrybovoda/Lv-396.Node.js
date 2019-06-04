import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../common/task';
import { User } from '../../../common/models/user';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() tasks: Task[];

  ngOnInit(): void {
  }

  // trackElement(index: number, task: Task): string {
  //   const uniqueCode = task.id + task.isOpen.toString();

  //   return uniqueCode;
  // }
}
