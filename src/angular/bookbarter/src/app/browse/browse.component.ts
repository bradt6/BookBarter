import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { Book } from '../book';
import { LoginService } from '../login.service';
import { BrowseService } from '../browse.service';
import { FavouritesService } from '../favourites.service';

@Component({
	selector: 'app-browse',
	templateUrl: './browse.component.html',
	styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
	private errorOccured: string = '';
	private bookForm: any;

	constructor(private fb: FormBuilder, 
		private cd: ChangeDetectorRef,
		private loginService: LoginService,
		private browseService: BrowseService,
		private favouriteService: FavouritesService) { }

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
}
