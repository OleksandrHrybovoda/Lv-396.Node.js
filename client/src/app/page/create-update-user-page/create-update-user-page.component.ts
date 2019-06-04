import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUpdateUserService } from '../common/create-update-user.service';
import { DatesItem } from '../common/dates-item';

@Component({
  selector: 'app-create-update-user-page',
  templateUrl: './create-update-user-page.component.html',
  styleUrls: ['./create-update-user-page.component.scss']
})
export class CreateUpdateUserPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  user: User = new User();
  finalContacts: [];
  finalDates: DatesItem[];
  finalMContacts: [];
  ifChosenDevelopmentDepartment: boolean;
  ifChosenHrDepartment: boolean;
  notValidUser: boolean;
  create: boolean;
  requiredForCreationUserFields: any[];
  emptyDates: boolean;

  constructor(private readonly userService: UserService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly toastr: ToastrService,
              private readonly createUpdateUserService: CreateUpdateUserService){
  }

  ngOnInit(): void {
    this.subscribeForUpdates();
    this.notValidUser = false;
    this.finalContacts = [];
    this.finalDates = [];
    this.finalMContacts = [];
    this.emptyDates = false;

    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.getEmployee(id);
    });
    this.deleteNotValidValuesFromUserObjectOnDepartmentChoose();
  }

  private subscribeForUpdates(): void {
    this.createUpdateUserService.userDataUpdator
      .takeUntil(this.destroy$)
      .subscribe((date) => {
      this[date.name] = date.value;
    });
  }

  private getEmployee(id: string): void {
    if (id && !this.userService.user) {
      this.userService.getUser(id, true)
        .takeUntil(this.destroy$)
        .subscribe(user => this.user = user);
    } else if (id && this.userService.user) {
      this.user = this.userService.user;
    } else {
      this.create = true;
    }
  }

  setContacts(contacts: []): void {
    this.finalContacts = contacts;
    this.user.contacts =  this.finalContacts;
  }

  setMContacts(contacts: []): void {
    this.finalMContacts = contacts;
    this.user.phone = this.finalMContacts['phone'];
    this.user.email =  this.finalMContacts['email'];
  }

  checkOnEmptyDates(): void {
    this.finalDates.map(item => {
      this.emptyDates = !item.topic || !item.date ? true : false;
    });
  }

  extractUser(user, chosenDevelopmentDepartment, chosenHrDepartment): any {
    this.user = user;
    this.ifChosenDevelopmentDepartment = chosenDevelopmentDepartment;
    this.ifChosenHrDepartment = chosenHrDepartment;
    this.user.contacts =  this.finalContacts;
    this.user.dates =  this.finalDates;

    if (this.validateUser()) {
      if (this.user._id) {
        this.userService.updateUser(this.user)
          .takeUntil(this.destroy$)
          .subscribe((data: any) => {
              this.toastr.success('Profile successfully updated', 'Result', {
                positionClass: 'toast-top-full-width',
                closeButton: true
              });
              this.router.navigate(['/profile/my-profile/', this.user._id], {relativeTo: this.route});
            }, error => this.errorHandling(error)
          );
      } else {
        this.userService.addUser(this.user)
          .takeUntil(this.destroy$)
          .subscribe((data: any) => {
              this.toastr.success('Profile successfully created', 'Result', {
                positionClass: 'toast-top-full-width',
                closeButton: true
              });
              this.router.navigate(['/profile/my-profile/', data.newUser._id], {relativeTo: this.route});
            }, error => this.errorHandling(error)
          );
      }
    } else {
      this.notValidUser = true;
      this.toastr.error('Please, fill in all required fields', 'Result', {
        positionClass: 'toast-top-full-width',
        closeButton: true
      });
    }
  }

  validateUser(): boolean {
    this.user.type = this.ifChosenHrDepartment ? 'hr' : 'developer';
    this.requiredForCreationUserFields = [this.user.firstName, this.user.lastName, this.user.department,
                                          this.user.position, this.user.hr, this.user.manager];
    if (this.ifChosenDevelopmentDepartment) {
      this.requiredForCreationUserFields = [...this.requiredForCreationUserFields, this.user.teamlead];
    }
    let requiredField = true;
    this.requiredForCreationUserFields.map(elem => {
      this.checkOnEmptyDates();
      if (!elem ||  this.emptyDates) {
        requiredField = false;
      }
    });

    return requiredField;
  }

  deleteNotValidValuesFromUserObjectOnDepartmentChoose(): void {
    this.userService.chosenDepartment.subscribe(() => {
      delete this.user.teamlead;
      delete this.user.position;
    });
  }

  errorHandling(error): void {
    const errorMessage = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Error Code: ${error.status}\nMessage: ${error.message}`;
    this.toastr.error(errorMessage, 'Error Message', {
      positionClass: 'toast-top-full-width',
      closeButton: true
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


