import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { Book } from '../book';
import { LoginService } from '../login.service';
import { BrowseService } from '../browse.service';
import { FavouritesService } from '../favourites.service';
import { CheckoutService } from '../checkout.service';

@Component({
	selector: 'app-browse',
	templateUrl: './browse.component.html',
	styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
	private errorOccured: string = '';
	private bookForm: any;

	constructor(private fb: FormBuilder, 
		private router: Router,
		private dialog: MatDialog,
		private cd: ChangeDetectorRef,
		private loginService: LoginService,
		private browseService: BrowseService,
		private favouriteService: FavouritesService,
		private checkoutService: CheckoutService) { }

	ngOnInit() {
		this.bookForm = this.fb.group({
			title: ['', [Validators.required, Validators.maxLength(20)]],
			author: ['', Validators.required],
			publisher: ['', Validators.required],
			description: ['', Validators.required],
			text: ['', Validators.required],
			picture: ['', Validators.required],
		})

		this.getBooks();
		this.favouriteService.getFavourites();
	}

	getBooks() {
		this.browseService.getBooks();
	}

	onSubmit() {
		this.browseService.createBook(this.bookForm.value as Book).subscribe((data) => {
			if (data['result'] == true) {
				this.getBooks();
			} else {
				this.errorOccured = data['error'];	
			}
		})
	}

	onFileChange(event) {
		const reader = new FileReader();

		if(event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.bookForm.patchValue({
					picture: reader.result
				});

				// need to run CD since file load runs outside of zone
				this.cd.markForCheck();
			};
		}
	}

	read(book: Book) {
		if (this.loginService.loggedIn()) {
			this.router.navigate(['/read', book.id])
		} else {
			this.openDialog()
		}
	}

	favourite(book: Book) {
		if (this.loginService.loggedIn()) {
			this.favouriteService.favouriteBook(book)
		} else {
			this.openDialog()
		}
	}

	buy(book: Book) {
		if (this.loginService.loggedIn()) {
			this.checkoutService.addToCart(book)
		} else {
			this.openDialog()
		}
	}

	openDialog() {
		let dialogRef = this.dialog.open(LoginDialog, {
			width: '250px',
			data: {}
		});
	}
}

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'login-dialog',
	templateUrl: 'login-dialog.html',
})
export class LoginDialog {
	constructor(
		public dialogRef: MatDialogRef<LoginDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	onClick(): void {
		this.dialogRef.close();
	}
}


