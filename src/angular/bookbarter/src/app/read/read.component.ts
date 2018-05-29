import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BrowseService } from '../browse.service';
import { Book } from '../book';

@Component({
	selector: 'app-read',
	templateUrl: './read.component.html',
	styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
	private loading = true;
	private book: Book = {} as Book;

	constructor(private route: ActivatedRoute, 
				private browseService: BrowseService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.browseService.getBookText(params['id']).subscribe((data) => {
				this.loading = false;
				if (data['result'] !== false) {
					Object.assign(this.book, data['result']);
				} else {
					//this.errorOccured = data['error'];	
				}
			});
		});
	}

}
