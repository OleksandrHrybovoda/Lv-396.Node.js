import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError, Subject } from 'rxjs';
import { AuthService } from '../../../common/services/auth.service';
import { UserService } from '../../../common/services/user.service';
import { DateService } from '../../common/date.service';
import { TasksService } from '../../common/tasks.service';
import { User } from '../../../common/models/user';
import { Task } from '../../common/task';
import { NavItem, NavItemSet } from '../../common/nav-item';
import { DatesItem } from '../../common/dates-item';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss'],
  providers: [AuthService]
})

export class NavbarProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() public userType: string;
  @Input() public menuList: NavItem[];

  user: User;
  newTasks: Task[];
  dateList: DatesItem[];
  newTasksCount: number;
  datesCount: number;
  todayDate: Date;
  typeOfUser: boolean;
  active: boolean;
  itemMenuSettings: NavItemSet;
  avatar: string;


  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly userService: UserService,
              private readonly tasksService: TasksService,
              private readonly dateService: DateService) {
  }

  ngOnInit(): void {
    this.userService.takeUser
      .takeUntil(this.destroy$)
      .subscribe(user => {
        this.user = user;
        this.avatar = user.photoURL || '../../../../assets/img/userimg.jpg';
        if (user.watched_issues) {
          this.loadUserTasks(user.watched_issues);
        }
      });
    this.loadDates();
    this.todayDate = new Date();
    this.itemMenuSettings = {
      type: 'rightMenu',
      style: 'right-menu-elem dropdown-item'
    };

  }

  openTaskByid(taskID: string): boolean {
    this.router.navigate(['/profile/upcoming-tasks'])
      .catch(err => throwError(new Error(err)));
    if (this.typeOfUser) {
      this.tasksService.taskIsWatched(this.user._id, taskID)
        .takeUntil(this.destroy$)
        .subscribe(res => {
          this.removeFromNew(taskID);
        });
    }
    this.tasksService.openTaskById(taskID);
    setTimeout(() => {
      this.scrollTo(taskID);
    }, 300);

    return false;
  }

  scrollTo(id: string): void {
    document.getElementById(id)
      .scrollIntoView();
  }

  loadDates(): void {
    if (this.userService.getUserType() === 'hr') {
      this.typeOfUser = true;
      this.userService.getUsersOfHr()
        .takeUntil(this.destroy$)
        .subscribe(users => {
          this.dateList = [];
          users.forEach((user) => {
            this.dateList = this.dateService.setDateList(user, this.dateList);
          });
          this.dateList = this.checkTodayDate(this.dateList);
          this.datesCount = this.dateList.length;
        });
    } else if (this.userService.getUserType() === 'developer') {
      this.userService.getUser(this.userService.getUserId())
        .takeUntil(this.destroy$)
        .subscribe(user => {
          this.dateList = [];
          this.dateList = this.dateService.setDateList(user, this.dateList);
          this.dateList = this.checkTodayDate(this.dateList);
          this.datesCount = this.dateList.length;
        });
    }
  }

  loadUserTasks(watchedTasks): void {
    this.tasksService.takeUserTasks
      .takeUntil(this.destroy$)
      .subscribe(tasks => {
        this.newTasks = this.findNewTasks(tasks, watchedTasks);
        this.newTasksCount = this.newTasks.length;
      });
  }

  removeFromNew(taskID): void {
    this.newTasks = this.newTasks.filter(task => task.id !== taskID);
    this.newTasksCount -= 1;
  }

  findNewTasks(allTasks: any, watched: string[]): Task[] {
    if (this.userType === 'hr') {
      const arr = allTasks.filter(task => (task.author._id !== this.user._id && !task.resolvedByPerformer));

      return arr.filter(task => !(watched.includes(task.id)));
    }
    if (this.userType === 'developer') {
      return allTasks.filter(task => task.resolvedByPerformer && !task.resolvedByAuthor);
    }
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home'])
      .catch(err => throwError(new Error(err)));

    return false;
  }

  editUserPage(): void {
    this.router.navigate(['/profile/edit-user', this.user._id], { relativeTo: this.route })
      .catch(err => throwError(new Error(err)));
  }

  currentByIndex(i: number): boolean {
    if (this.menuList[i].logout) {
      this.logout();
    }
    if (this.menuList[i].router === '/profile/edit-user/:id') {
      this.editUserPage();
    }

    return false;
  }

  trackById(index: number, item: NavItem): string {
    return item.id;
  }

  checkTodayDate(dateList): DatesItem[] {
    return dateList.filter(date =>
      this.dateService.convertDate(date.date) === this.dateService.convertDate(this.todayDate)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
