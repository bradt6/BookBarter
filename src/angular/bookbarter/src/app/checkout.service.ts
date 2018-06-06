import { Injectable } from '@angular/core';

import { Book } from './book';

@Injectable({
	providedIn: 'root'
})
export class CheckoutService {
	books: Book[] = []
	
	constructor() { }

	addToCart(book: Book) {
		if (!this.books.some(x => x.id === book.id)) {
			this.books.push(book)
		}
	}

	removeFromCart(book: Book) {
		this.books = this.books.filter(x => x.id !== book.id)
	}
}
