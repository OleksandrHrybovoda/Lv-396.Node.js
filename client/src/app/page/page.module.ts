import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WrapperComponent } from './wrapper/wrapper.component';
import { UserBarInfoComponent } from './user-bar-info/user-bar-info.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { UserImageComponent } from './user-bar-info/user-image/user-image.component';
import { LinkToProfileComponent } from './user-bar-info/link-to-profile/link-to-profile.component';
import { DropdownFilterComponent } from './filter/dropdown-filter/dropdown-filter.component';
import { AccordionComponent } from './list/accordion/accordion.component';
import { FilterTasksByPipe } from './filter-tasks-by.pipe';
import { ItemComponent } from './list/accordion/item/item.component';
import { ModalComponent } from './modal/modal.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { UserListComponent } from './contact-info/user-list/user-list.component';
import { UserFilterComponent } from './contact-info/user-filter/user-filter.component';
import { FilterUsersByPipe } from './contact-info/filter-users-by.pipe';
import { DatepickerFilterComponent } from './filter/datepicker-filter/datepicker-filter.component';
import { CreateUpdateUserPageComponent } from './create-update-user-page/create-update-user-page.component';
import { DropdownInfoComponent } from './create-update-user-page/create-update-side-bar-info/dropdown-info/dropdown-info.component';
import { CreateUpdateSideBarInfoComponent } from './create-update-user-page/create-update-side-bar-info/create-update-side-bar-info.component';
import { UpcomingDatesComponent } from './upcoming-dates/upcoming-dates.component';
import { ListDatesComponent } from './upcoming-dates/list-dates/list-dates.component';
import { ItemDateComponent } from './upcoming-dates/list-dates/item-date/item-date.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { DatepickerComponent } from './create-update-user-page/create-update-user/create-update-date/datepicker/datepicker.component';


import { appConfigProviders } from './common/config';
import { FilterReturnService } from './common/filter-return.service';
import { FilterDatesByPipe } from './filter-dates-by.pipe';
import { CreateUpdateUserComponent } from './create-update-user-page/create-update-user/create-update-user.component';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { AdditionalContactsComponent } from './create-update-user-page/additional-contacts/additional-contacts.component';
import { ContactTypesComponent } from './create-update-user-page/additional-contacts/contact-types/contact-types.component';
import { CreateUpdateDateComponent } from './create-update-user-page/create-update-user/create-update-date/create-update-date.component';
import { UpdateAvatarComponent } from './create-update-user-page/update-avatar/update-avatar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    WrapperComponent,
    UserBarInfoComponent,
    FilterComponent,
    ListComponent,
    UserImageComponent,
    LinkToProfileComponent,
    DropdownFilterComponent,
    AccordionComponent,
    FilterTasksByPipe,
    FilterDatesByPipe,
    ItemComponent,
    ModalComponent,
    MyProfileComponent,
    ContactInfoComponent,
    UserListComponent,
    UserFilterComponent,
    FilterUsersByPipe,
    CreateUpdateUserPageComponent,
    CreateUpdateSideBarInfoComponent,
    DatepickerFilterComponent,
    DropdownInfoComponent,
    UpcomingDatesComponent,
    ListDatesComponent,
    ItemDateComponent,
    AddTaskFormComponent,
    CreateUpdateUserComponent,
    DatepickerComponent,
    CommentModalComponent,
    AdditionalContactsComponent,
    ContactTypesComponent,
    CreateUpdateDateComponent,
    UpdateAvatarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    ScrollingModule
  ],
  providers: [
    appConfigProviders,
    FilterReturnService
  ],
  bootstrap: [WrapperComponent]
})
export class PageModule { }
