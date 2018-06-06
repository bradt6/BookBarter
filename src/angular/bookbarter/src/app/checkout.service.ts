import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BrowseService } from './browse.service';
import { LoginService } from './login.service';
import { Book } from './book';

@Injectable({
	providedIn: 'root'
})
export class CheckoutService {
	private apiUrl = 'http://localhost:5003';
	books: Book[] = []
	
	constructor(private http: HttpClient,
				private browseService: BrowseService, 
				private loginService: LoginService) { }

	getCartItems() {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.loginService.loginToken
			})
		}
		let post = this.http.get(`${this.apiUrl}/cart`, options).share()
		post.subscribe((data) => {
			this.browseService.getBooks().subscribe((data2) => {
				let cart = data['result']
				let books = data2['result']
				if (cart !== false && books !== false) {
					this.books = books.filter(book => cart.indexOf(book.id) !== -1)
				}
			});
		});
	}

	addToCart(book: Book) {
		if (!this.books.some(x => x.id === book.id)) {
			let options = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.loginService.loginToken
				})
			}
			let sendObject = { 'book_id': book.id }
			let post = this.http.post(`${this.apiUrl}/cart`, sendObject, options).share()
			post.subscribe(() => {
				this.books.push(book)
			});
		}
	}

	removeFromCart(book: Book) {
		if (this.books.some(x => x.id === book.id)) {
			let options = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.loginService.loginToken
				})
			}
			let sendObject = { 'book_id': book.id }
			let post = this.http.post(`${this.apiUrl}/cart/remove`, sendObject, options).share()
			post.subscribe(() => {
				this.books = this.books.filter(x => x.id !== book.id)
			});
		}
	}

	inCart(book: Book) {
		return this.books.some(x => x.id === book.id)
	}
}
