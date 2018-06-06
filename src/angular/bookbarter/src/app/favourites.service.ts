import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BrowseService } from './browse.service';
import { LoginService } from './login.service';
import { Book } from './book';

@Injectable({
	providedIn: 'root'
})
export class FavouritesService {
	private apiUrl = 'http://localhost:5002';
	public books: Book[] = [];

	constructor(private http: HttpClient,
				private browseService: BrowseService, 
				private loginService: LoginService) { }

	favouriteBook(book: Book) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.loginService.loginToken
			})
		}
		let sendObject = { 'book_id': book.id }
		let post = this.http.post(`${this.apiUrl}/favourite`, sendObject, options).share()
		post.subscribe(() => {
			this.books.push(book)
		});
	}

	getFavourites() {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.loginService.loginToken
			})
		}
		let post = this.http.get(`${this.apiUrl}/favourite`, options).share()
		post.subscribe((data) => {
			this.browseService.getBooks().subscribe((data2) => {
				let favourites = data['result']
				let books = data2['result']
				if (favourites !== false && books !== false) {
					this.books = books.filter(book => favourites.indexOf(book.id) !== -1)
				}
			});
		});
	}

	inFavourites(book: Book) {
		return this.books.some(x => x.id === book.id)
	}
}
