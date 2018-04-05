import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControlDirective, FormGroupDirective } from '@angular/forms';
import {
	MatInputModule, 
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatToolbarModule,
	MatTooltipModule,
	MatMenuModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { LoginService } from './login.service';
import { Home2Component } from './home2/home2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    Home2Component
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	AppRoutingModule,
	MatInputModule,
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatToolbarModule,
	MatTooltipModule,
	MatMenuModule,
  ],
  providers: [
  	FormControlDirective,
	FormGroupDirective,
	LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
