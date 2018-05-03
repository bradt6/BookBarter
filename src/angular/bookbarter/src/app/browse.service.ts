import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Book } from './book';

@Injectable()
export class BrowseService {
	private apiUrl = 'http://localhost:5001';
	public books: Book[] = [];

	constructor(private http: HttpClient) { }

	getBooks() {
		let post = this.http.get(`${this.apiUrl}/browse`)
		post.subscribe(data => {
			this.books = data['result'] as Book[];
		});
		return post
	}

	createBook(book: Book) {
		let post = this.http.get(`${this.apiUrl}/browse`, book)
		return post
	}
}
