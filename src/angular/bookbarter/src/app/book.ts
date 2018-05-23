import { SafeHtml } from '@angular/platform-browser';

export class Book {
	constructor(public title: string,
				public description: string,
				public author: string,
				public publisher: string,
				public picture: SafeHtml) {}
}
