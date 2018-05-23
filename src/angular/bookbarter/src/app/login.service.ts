import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export function LocalStorage(
    target: Object, // The prototype of the class
    decoratedPropertyName: string // The name of the property
    ) {

    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
        get: function () {
            return localStorage.getItem(decoratedPropertyName) || '';
        },
        set: function (newValue) {
            localStorage.setItem(decoratedPropertyName, newValue);
        }
    });
}

@Injectable()
export class LoginService {
	private apiUrl = 'http://localhost:5000';

	@LocalStorage
	username: string;
	@LocalStorage
	loginToken: string;

	constructor(private http: HttpClient) { }

	login(username, password) {
		let post = this.http.post(`${this.apiUrl}/login`, {'username': username, 'password': password})
		post.subscribe(data => {
			if (data['result'] == true) {
				this.username = username
				this.loginToken = data['token']
			}
		})
		return post
	}

	logout() {
		this.username = '';
		this.loginToken = '';
	}

	register(username, password) {
		let post = this.http.post(`${this.apiUrl}/register`, {'username': username, 'password': password})
		post.subscribe(data => {
			if (data['result'] == true) {
				this.username = username
				this.loginToken = data['token']
			}
		})
		return post
	}

	loggedIn() {
		return this.loginToken !== ''
	}
}
