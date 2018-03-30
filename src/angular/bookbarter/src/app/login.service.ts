import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
	private apiUrl = 'http://localhost:5000';

	username: string = '';
	loginToken: string = '';

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
			console.log(data)
		})
		return post
	}

	loggedIn() {
		return this.loginToken !== ''
	}
}
