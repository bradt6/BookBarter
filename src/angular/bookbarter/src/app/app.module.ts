import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControlDirective, FormGroupDirective } from '@angular/forms';
import {
	MatCardModule,
	MatInputModule, 
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatToolbarModule,
	MatTooltipModule,
	MatMenuModule,
	MatGridListModule,
	MatListModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseComponent } from './browse/browse.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { LoginService } from './login.service';
import { BrowseService } from './browse.service';
import { ReadComponent } from './read/read.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BrowseComponent,
    ReadComponent,
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	AppRoutingModule,
	MatCardModule,
	MatInputModule,
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatToolbarModule,
	MatTooltipModule,
	MatMenuModule,
	MatGridListModule,
	MatListModule
  ],
  providers: [
  	FormControlDirective,
	FormGroupDirective,
	LoginService,
	BrowseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
