import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class CreateUpdateUserService {
  public userDataUpdator: Subject<UserData>;

  constructor() {
    this.userDataUpdator = new Subject();
  }

  public updateUserData(name: string, value: any): void {
    this.userDataUpdator.next({
      name,
      value,
    });
  }
}
