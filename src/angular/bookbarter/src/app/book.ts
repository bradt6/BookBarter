import { SafeHtml } from '@angular/platform-browser';

export class Book {
	constructor(public id: string,
				public text: string,
				public title: string,
				public description: string,
				public author: string,
				public publisher: string,
				public picture: SafeHtml) {}
}
