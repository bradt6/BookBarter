import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginService } from './login.service';
import { Book } from './book';

@Injectable()
export class BrowseService {
	private apiUrl = 'http://localhost:5001';
	public books: Book[] = [];

	constructor(private http: HttpClient, 
				private sanitizer: DomSanitizer,
				private loginService: LoginService) { }

	getBooks() {
		let post = this.http.get(`${this.apiUrl}/browse`)
		post.subscribe(data => {
			this.books = data['result'] as Book[];
			this.books.forEach(book => book.picture = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64,"+book.picture))
		});
		return post
	}

	createBook(book: Book) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.loginService.loginToken
			})
		}
		let post = this.http.post(`${this.apiUrl}/browse`, book, options)
		return post
	}
}
