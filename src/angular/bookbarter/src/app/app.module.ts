import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {
	MatInputModule, 
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatToolbarModule,
	MatTooltipModule,
	MatMenuModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	AppRoutingModule,
	MatInputModule,
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatToolbarModule,
	MatTooltipModule,
	MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
