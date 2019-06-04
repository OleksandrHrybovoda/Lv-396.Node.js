import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './common/interfaces/token.interceptor';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AUTH_PROVIDERS } from './common/services/auth.service';

import { LoggedInGuard } from './common/guards/logged-in.guard';
import { LoggedOutGuard } from './common/guards/logged-out.guard';
import { CheckDevGuard } from './common/guards/check-dev.guard';

import { PageComponent } from './page/page.component';
import { NavbarComponent } from './page/navbar/navbar.component';
import { NavbarProfileComponent } from './page/navbar/navbar-profile/navbar-profile.component';
import { SocialNetworksComponent } from './page/navbar/social-networks/social-networks.component';
import { BurgerMenuComponent } from './page/navbar/burger-menu/burger-menu.component';
import { MenuItemComponent } from './page/navbar/burger-menu/menu-item/menu-item.component';
import { ForgotPasswordComponent } from './home/common/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './home/common/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ScrollingDirective } from './page/navbar/scrolling.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    NavbarProfileComponent,
    SocialNetworksComponent,
    BurgerMenuComponent,
    MenuItemComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ScrollingDirective
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    AUTH_PROVIDERS,
    LoggedInGuard,
    LoggedOutGuard,
    CheckDevGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
