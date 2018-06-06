import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
	MatListModule,
	MatStepperModule,
	MatExpansionModule,
	MatDialogModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseComponent, LoginDialog } from './browse/browse.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { LoginService } from './login.service';
import { BrowseService } from './browse.service';
import { ReadComponent } from './read/read.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		HomeComponent,
		BrowseComponent,
		ReadComponent,
		FavouritesComponent,
		CheckoutComponent,
		LoginDialog
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
		MatListModule,
		MatStepperModule,
		MatExpansionModule,
		MatDialogModule
	],
	providers: [
		FormControlDirective,
		FormGroupDirective,
		LoginService,
		BrowseService,
		HttpClientModule
	],
	bootstrap: [AppComponent],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	entryComponents: [LoginDialog]
})
export class AppModule { }
