import { Component, OnInit } from '@angular/core';

import { BrowseService } from '../browse.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
	private errorOccured: string = '';
	private bookForm: any;

  constructor(private browseService: BrowseService) { }

  ngOnInit() {
	this.bookForm = this.fb.group({
		title: ['', [Validators.required, Validators.maxLength(20)]],
		description: ['', Validators.required]
		author: ['', Validators.required]
		publisher: ['', Validators.required]
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
}
