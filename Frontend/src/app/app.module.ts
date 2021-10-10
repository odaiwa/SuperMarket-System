import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [],
  // providers: [CalcService], // Create CalcService object for the entire app.

  // Register the interceptor so any request will invoke it:
  providers: [{
      provide: HTTP_INTERCEPTORS, // Register the interceptor
      useClass: AuthInterceptor, // Our interceptor class
      multi: true // Can register it several times if needed
  }],

  bootstrap: [LayoutComponent]
})
export class AppModule { }
