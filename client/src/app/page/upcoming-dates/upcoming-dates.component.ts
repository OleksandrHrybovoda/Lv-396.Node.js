import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { DatesItem } from '../common/dates-item';
import { FilterOptions } from '../common/filter-options';
import { Filter } from '../common/filter';
import { FiltersService } from '../common/filters.service';
import { FILTER_CSS_CLASS_PREFIX } from '../common/config';
import { DateService } from '../common/date.service';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-upcoming-dates',
  templateUrl: './upcoming-dates.component.html',
  styleUrls: ['./upcoming-dates.component.scss']
})
export class UpcomingDatesComponent implements OnInit, OnDestroy {
  user: User;
  filter: Filter[];
  dateList: DatesItem[];
  modalTypeVal: string;
  filterGrids: string;
  private destroy$ = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly filtersService: FiltersService,
    private readonly dateService: DateService,
    @Inject(FILTER_CSS_CLASS_PREFIX) public filterCssClassPrefix: string
  ) {}

  ngOnInit(): void {
    this.modalTypeVal = 'CREATE';
    this.loadUser();
    this.getFilters();
  }

  loadUser(): void {
    this.userService.getUser()
      .takeUntil(this.destroy$)
      .subscribe(user => {
        this.user = user;
        if (this.userService.getUserType() === 'hr') {
          this.userService.getUsersOfHr()
            .takeUntil(this.destroy$)
            .subscribe(users => {
              this.dateList = [];
              users.forEach((item) => {
                this.dateList = this.dateService.setDateList(item, this.dateList);
              });
            });
        } else if (this.userService.getUserType() === 'developer') {
            this.dateList = [];
            this.dateList = this.dateService.setDateList(user, this.dateList);
        }
      });
  }

  getFilters(): void {
    this.filtersService.getFilters()
      .takeUntil(this.destroy$)
      .subscribe(
        filters => this.filter = filters.filter((item: Filter) => item.name === 'date'),
        () => {},
        () => {
          this.filterGrids = this.filter.length ? this.filterCssClassPrefix + this.filter.length.toString() : '';
        }
      );
  }

  selectFilterOption = (data: any) => {
    if (this.filter.length) {
      this.filter = this.filter.map(
        (item: Filter) => item.id === data.filterId ? {
          id: item.id,
          name: item.name,
          isCalendar: item.isCalendar,
          defaultValue: data.optionId,
          options: this.setOptions(item.isCalendar, item.options, data.optionId)
        } : item
      );
    }
  };

  private readonly setOptions = (isCalendar: boolean, options: FilterOptions[], data: any) => {
    if (isCalendar) {
      return this.updateOptions(options, data);
    }

    return options;
  };

  private readonly updateOptions = (options: any, dateValue: any): [] => {
    if (dateValue === -1) {
      return options;
    }

    return options.map(opt =>
      opt.name === 'date' ? { name: opt.name, value: dateValue } : opt);
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
